import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import {Expense} from "../../../../../model/Expense";
import {View} from "../../../../../components/Themed";
import {StyleSheet, Text} from "react-native";
import {formatDate} from "../../../../../utils/dateFormat";
import CategoriesList from "./CategoriesList";

interface ExpensesListItemProps {
    expense: Expense
}

//TODO: implement useMemo for avoid re-rendering?

const ExpensesListItem: React.VFC<ExpensesListItemProps> = ({expense}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StyledText style={styles.textHeader}>{formatDate(expense.properties.Date.date.start)}</StyledText>

                {expense.properties.Categoria.multi_select.length ?
                    <CategoriesList categories={expense.properties.Categoria.multi_select}/> : null}
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    {expense.icon ?
                        <Text style={styles.icon}>{expense.icon.emoji}</Text> : (
                            expense.properties.Categoria.multi_select && expense.properties.Categoria.multi_select.length ?
                                <Text
                                    style={styles.icon}>{expense.properties.Categoria.multi_select[0].name.split(' ')[1]}</Text>
                                : null)
                    }

                    <StyledText style={styles.textName}>{expense.properties.Spesa.title[0].text.content}</StyledText>
                </View>
                <StyledText style={styles.textAmount}> - € {expense.properties.Amount.number}</StyledText>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    textHeader: {
        fontSize: 10,
        color: 'grey',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    icon: {
        fontSize: 28,
        marginRight: 15
    },
    textName: {
        fontSize: 16,
    },
    textAmount: {
        color: '#EC4E20',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default ExpensesListItem;