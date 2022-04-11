import React, {useState} from 'react';
import {Expense} from "../../../../model/Expense";
import {FlatList, ListRenderItemInfo, RefreshControl, SafeAreaView, StyleSheet, View} from "react-native";
import ExpensesListItem from "./components/ExpensesListItem";


interface ExpensesListProps {
    expenses: Expense[] | null,
    getExpenses: (start: string, end : string) => void,
    datesRange: {start: string, end: string}
}

const ExpensesList: React.FC<ExpensesListProps> = ({expenses, getExpenses, datesRange}) => {
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setRefreshing(true);
        getExpenses(datesRange.start, datesRange.end)
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={expenses}
                keyExtractor={(expense : Expense) => expense.id}
                renderItem={({item}: ListRenderItemInfo<Expense>) => <ExpensesListItem expense={item} />}
                initialNumToRender={5}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'grey'
    }
});

export default ExpensesList;