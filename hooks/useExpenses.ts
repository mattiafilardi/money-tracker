// @ts-ignore
import { NOTION_SECRET, NOTION_EXPENSES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {QueryDatabaseResponse} from "@notionhq/client/build/src/api-endpoints";
import {Expense} from "../screens/AddTransaction/model/Expense";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[] | null>(null)


    const getExpenses = async () => {
        return await notion.databases.query({
            database_id: NOTION_EXPENSES_DATABASE_ID,
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });
    }

    useEffect(() => {
        getExpenses()
            .then(expenses => setExpenses(expenses.results as Expense[]))
    }, [])

    return {
        expenses
    }
}