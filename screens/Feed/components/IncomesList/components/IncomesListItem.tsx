import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import {View} from "../../../../../components/Themed";
import {StyleSheet, Text} from "react-native";
import {formatDate} from "../../../../../utils/dateFormat";
import CategoriesList from "./../../ExpensesList/components/CategoriesList";
import {Income} from "../../../../../model/Income";

interface IncomesListItemProps {
    income: Income
}

const IncomesListItem: React.VFC<IncomesListItemProps> = ({income}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StyledText style={styles.textHeader}>{formatDate(income.properties.Data.date.start)}</StyledText>

                {income.properties.Categoria.multi_select.length ?
                    <CategoriesList categories={income.properties.Categoria.multi_select}/> : null}
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    {income.icon ?
                        <Text style={styles.icon}>{income.icon.emoji}</Text> : (
                            income.properties.Categoria.multi_select && income.properties.Categoria.multi_select.length ?
                                <Text
                                    style={styles.icon}>{income.properties.Categoria.multi_select[0].name.split(' ')[1]}</Text>
                                : null)
                    }
                    <StyledText style={styles.textName}>{income.properties.Entrata.title[0].text.content}</StyledText>
                </View>
                <StyledText style={styles.textAmount}> € {income.properties.Amount.number}</StyledText>
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
    categories: {
        flexDirection: 'row',
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
        color: '#54a22a',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default IncomesListItem;