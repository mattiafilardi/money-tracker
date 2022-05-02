import {StyleSheet} from 'react-native';
import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import {useExpenses} from "../../hooks/useExpenses";
import ExpensesList from "./components/ExpensesList/ExpensesList";
import {useIncomes} from "../../hooks/useIncomes";
import Summary from "./components/Summary/Summary";
import Loader from "../../components/Loader";
import {Transaction} from "../../model/Transaction";
import React, {useEffect, useState} from "react";
import IncomesList from "./components/IncomesList/IncomesList";
import {LinearGradient} from "expo-linear-gradient";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../../utils/dateFormat";

export default function FeedScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const [category, setCategory] = useState<Transaction['type']>('expense')
    const {isLoading: isLoadingExpenses, expenses, getExpenses} = useExpenses();
    const {isLoading: isLoadingIncomes, getIncomes, incomes} = useIncomes()

    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [totalIncomes, setTotalIncomes] = useState<number>(0)

    const [datesRange, setDatesRange] = useState({
        start: getFirstDayOfMonth(Date.now()),
        end: getLastDayOfMonth(Date.now())
    })

    // TODO: render EmptyList component when expenses list or incomes list are empty

    useEffect(() => {
        getExpenses(datesRange.start, datesRange.end)
        getIncomes(datesRange.start, datesRange.end)
    }, [datesRange])

    useEffect(() => {
        const totalExpenses = expenses?.reduce((prev, current) => prev + current.properties.Amount.number, 0)
        const totalIncomes = incomes?.reduce((prev, current) => prev + current.properties.Amount.number, 0)

        setTotalExpenses(totalExpenses || 0);
        setTotalIncomes(totalIncomes || 0);
    }, [expenses, incomes])

    return (
        <>
            {isLoadingExpenses || isLoadingIncomes ? <Loader colors={['#BAADFF', '#9381FF', '#745CFF']}/> : (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#BAADFF', '#9381FF', '#745CFF']}
                        style={styles.container}
                    >
                        <Summary
                            setCategory={setCategory} totalExpenses={totalExpenses} totalIncomes={totalIncomes}
                            datesRange={datesRange} setDatesRange={setDatesRange}
                        />
                    </LinearGradient>

                    <View style={styles.transactionsContainer}>
                        {category === 'expense' && <ExpensesList expenses={expenses} getExpenses={getExpenses} datesRange={datesRange}/>}
                        {category === 'income' && <IncomesList incomes={incomes} getIncomes={getIncomes} datesRange={datesRange} />}
                    </View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9381FF'
    },
    transactionsContainer: {
        flex: 1,
        padding: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    }
});
