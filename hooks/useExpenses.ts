// @ts-ignore
import { NOTION_SECRET, NOTION_EXPENSES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {Expense, MultiSelect} from "../model/Expense";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useExpenses = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [expenses, setExpenses] = useState<Expense[] | null>(null)

    useEffect(() => {
        getExpenses()
    }, [])

    // TODO: change the names of the functions

    const getExpensesRequest = async (startDate: string, endDate: string, startCursor: string | undefined) => {
        return await notion.databases.query({
            database_id: NOTION_EXPENSES_DATABASE_ID,
            filter: {
                and: [{
                    property: 'Date',
                    date: {
                        on_or_after: startDate
                    },
                },
                    {
                        property: 'Date',
                        date: {
                            on_or_before: endDate
                        },
                    }],
            },
            start_cursor: startCursor,
            sorts: [{
                property: 'Date',
                direction: 'descending'
            }],
        })
    }

    const getExpenses = async (startDate: string = getFirstDayOfMonth(Date.now()), endDate: string = getLastDayOfMonth(Date.now())) => {
        setLoading(true)

        getExpensesRequest(startDate, endDate, undefined)
            .then(async expenses => {
                let results = [...expenses.results]
                let hasMore = expenses.has_more
                let startCursor = expenses.next_cursor ? expenses.next_cursor : undefined

                while(hasMore){
                    let data = await getExpensesRequest(startDate, endDate, startCursor)

                    hasMore = data.has_more
                    startCursor = data.next_cursor ? data.next_cursor : undefined
                    results = [...results, ...data.results]
                }

                setExpenses(results as Expense[])
            })
            .finally(() => setLoading(false))
    }

    const retrieveCategoryProperty = async () => {
        setLoading(true)
        const response = await notion.databases.retrieve({ database_id: NOTION_EXPENSES_DATABASE_ID });
        setLoading(false)
        return response.properties.Categoria.multi_select.options as MultiSelect[]
    }

    const insertExpense = async () => {

    }

    return {
        isLoading,
        getExpenses,
        insertExpense,
        expenses,
        retrieveCategoryProperty
    }
}
