// @ts-ignore
import {NOTION_INCOMES_DATABASE_ID, NOTION_SECRET} from '@env'
import {Client} from "@notionhq/client";
import {useEffect, useState} from "react";
import {Income, MultiSelect} from "../model/Income";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";
import {Category} from "../screens/AddTransaction/components/Form/Form";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useIncomes = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [incomes, setIncomes] = useState<Income[] | null>(null)

    useEffect(() => {
        getIncomes()
    }, [])

    const getIncomesRequest = async (startDate: string, endDate: string, startCursor: string | undefined) => {
        return await notion.databases.query({
            database_id: NOTION_INCOMES_DATABASE_ID,
            filter: {
                and: [
                    {
                        property: 'Data',
                        date: {
                            on_or_after: startDate
                        },
                    },
                    {
                        property: 'Data',
                        date: {
                            on_or_before: endDate
                        },
                    },
                ],
            },
            start_cursor: startCursor,
            sorts: [
                {
                    property: 'Data',
                    direction: 'descending',
                },
            ],
        })
    }

    const getIncomes = async (startDate: string = getFirstDayOfMonth(Date.now()), endDate: string = getLastDayOfMonth(Date.now())) => {
        setLoading(true)

        getIncomesRequest(startDate, endDate, undefined)
            .then(async incomes => {
                let results = [...incomes.results]
                let hasMore = incomes.has_more
                let startCursor = incomes.next_cursor ? incomes.next_cursor : undefined

                while(hasMore){
                    let data = await getIncomesRequest(startDate, endDate, startCursor)

                    hasMore = data.has_more
                    startCursor = data.next_cursor ? data.next_cursor : undefined
                    results = [...results, ...data.results]
                }

                setIncomes(incomes.results as Income[])
            })
            .finally(() => setLoading(false))
    }

    const retrieveCategoryProperty = async () => {
        setLoading(true)
        const response = await notion.databases.retrieve({ database_id: NOTION_INCOMES_DATABASE_ID });
        setLoading(false)
        return response.properties.Categoria.multi_select.options as MultiSelect[]
    }

    const insertIncome = async (form: {name: string, comment: string, emoji: string, date: string, categories: Category[]}, amount: number) => {
        const icon = form.emoji.length ?  {icon: {emoji: form.emoji }} : undefined

        const response = await notion.pages.create({
            parent: {
                database_id: NOTION_INCOMES_DATABASE_ID,
            },
            icon,
            properties: {
                Entrata: {
                    title: [
                        {
                            text: {
                                content: form.name,
                            },
                        },
                    ],
                },
                Commento: {
                    rich_text: [
                        {
                            text: {
                                content: form.comment,
                            },
                        },
                    ],
                },
                Categoria: {
                    "multi_select": form.categories
                },
                Data: {
                    "date": {
                        "start": "2022-04-10"
                    }
                },
                Amount: {
                    number: amount,
                },
            }
        });
    }

    return {
        isLoading,
        getIncomes,
        insertIncome,
        incomes,
        retrieveCategoryProperty
    }
}
