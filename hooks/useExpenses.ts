// @ts-ignore
import { NOTION_SECRET, NOTION_EXPENSES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {GetDatabaseResponse} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<GetDatabaseResponse>()

    const queryExpensesDatabase = async () => {
        return await notion.databases.retrieve({
            database_id: NOTION_EXPENSES_DATABASE_ID,
        })
    }

    useEffect(() => {
        queryExpensesDatabase()
            .then((expenses) => setExpenses(expenses))
    }, [])

    return {
        expenses
    }
}