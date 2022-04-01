// @ts-ignore
import { NOTION_SECRET, NOTION_INCOMES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {Income} from "../screens/AddTransaction/model/Income";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useIncomes = () => {
    const [incomes, setIncomes] = useState<Income[] | null>(null)

    const getIncomes = async () => {
        return await notion.databases.query({
            database_id: NOTION_INCOMES_DATABASE_ID,
            sorts: [
                {
                    property: 'Data',
                    direction: 'descending',
                },
            ],
        });
    }

    useEffect(() => {
        getIncomes()
            .then(incomes => setIncomes(incomes.results as Income[]))
    }, [])

    return {
        incomes
    }
}