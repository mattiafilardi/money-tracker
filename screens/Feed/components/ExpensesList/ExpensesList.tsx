import React from 'react';
import {Expense} from "../../../AddTransaction/model/Expense";
import {FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, View} from "react-native";
import ExpensesListItem from "./ExpensesListItem";

interface ExpensesListProps {
    expenses: Expense[] | null
}

const ExpensesList: React.FC<ExpensesListProps> = ({expenses}) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={expenses}
                renderItem={({item}: ListRenderItemInfo<Expense>) => <ExpensesListItem expense={item} />}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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