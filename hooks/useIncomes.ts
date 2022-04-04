// @ts-ignore
import { NOTION_SECRET, NOTION_INCOMES_DATABASE_ID } from '@env'
import { Client } from "@notionhq/client";
import {useEffect, useState} from "react";
import {Income} from "../model/Income";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";

const notion = new Client({
    auth: NOTION_SECRET,
});

export const useIncomes = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [incomes, setIncomes] = useState<Income[] | null>(null)

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

    useEffect(() => {
        getIncomes()
    }, [])

    return {
        isLoading,
        getIncomes,
        incomes
    }
}