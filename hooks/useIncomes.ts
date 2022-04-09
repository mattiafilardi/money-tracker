// @ts-ignore
import {NOTION_INCOMES_DATABASE_ID, NOTION_SECRET} from '@env'
import {Client} from "@notionhq/client";
import {useEffect, useState} from "react";
import {Income, MultiSelect} from "../model/Income";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useIncomes = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [incomes, setIncomes] = useState<Income[] | null>(null)

    useEffect(() => {
        getIncomes()
    }, [])

    const getIncomes = async (startDate: string = getFirstDayOfMonth(Date.now()), endDate: string = getLastDayOfMonth(Date.now())) => {
        setLoading(true)

        await notion.databases.query({
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
            sorts: [
                {
                    property: 'Data',
                    direction: 'descending',
                },
            ],
        })
            .then(incomes => setIncomes(incomes.results as Income[]))
            .finally(() => setLoading(false))
    }

    const retrieveCategoryProperty = async () => {
        const response = await notion.databases.retrieve({ database_id: NOTION_INCOMES_DATABASE_ID });
        return response.properties.Categoria.multi_select.options as MultiSelect[]
    }

    const insertIncome = async () => {
        const response = await notion.pages.create({
            parent: {
                database_id: NOTION_INCOMES_DATABASE_ID,
            },
            icon: {
                type: "emoji",
                emoji: "🥬"
            },
            properties: {
                Entrata: {
                    title: [
                        {
                            text: {
                                content: 'Prova API',
                            },
                        },
                    ],
                },
                Commento: {
                    rich_text: [
                        {
                            text: {
                                content: 'Commento',
                            },
                        },
                    ],
                },
                Categoria: {
                    "multi_select": [
                        {
                            "name": "Stipendio"
                        },
                    ]
                },
                Data: {
                    "date": {
                        "start": "2022-04-10"
                    }
                },
                Amount: {
                    number: 2.5,
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