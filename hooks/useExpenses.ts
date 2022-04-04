// @ts-ignore
import { NOTION_SECRET, NOTION_EXPENSES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {Expense} from "../model/Expense";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useExpenses = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [expenses, setExpenses] = useState<Expense[] | null>(null)

    const getExpenses = async (startDate: string = getFirstDayOfMonth(Date.now()), endDate: string = getLastDayOfMonth(Date.now())) => {
        setLoading(true)

        await notion.databases.query({
            database_id: NOTION_EXPENSES_DATABASE_ID,
            filter: {
                and: [
                    {
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
                    },
                ],
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        })
            .then(expenses => setExpenses(expenses.results as Expense[]))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getExpenses()
    }, [])

    return {
        isLoading,
        getExpenses,
        expenses
    }
}