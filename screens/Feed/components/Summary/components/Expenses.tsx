import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import Colors from "../../../../../constants/Colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Transaction} from "../../../../../model/Transaction";
import useColorScheme from "../../../../../hooks/useColorScheme";

interface ExpensesProps {
    totalExpenses: number,
    setCategory: (category: Transaction['type']) => void
}

const Expenses: React.VFC<ExpensesProps> = ({totalExpenses, setCategory}) => {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setCategory('expense')}>
            <StyledText>
                <StyledText style={styles.emoji}>💸  </StyledText>
                <StyledText style={[styles.transactionTitle, {color: Colors[colorScheme].background}]}>EXPENSES</StyledText>
            </StyledText>

            <StyledText style={[styles.textTransactionNumber, {color: Colors[colorScheme].background}]}>
                -€ {totalExpenses.toFixed(2)}
            </StyledText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    transactionTitle: {
        fontSize: 12,
        letterSpacing: 2,
        opacity: 0.8
    },
    emoji: {
        opacity: 1,
        fontSize: 14
    },
    textTransactionNumber: {
        fontSize: 18,
        letterSpacing: 1.5,
        marginVertical: 10
    }
})

export default Expenses;