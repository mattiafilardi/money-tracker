import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Transaction} from "../../../../../model/Transaction";

interface ExpensesProps {
    totalExpenses: number,
    setCategory: (category: Transaction['type']) => void
}

const Expenses: React.VFC<ExpensesProps> = ({totalExpenses, setCategory}) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setCategory('expense')}>
            <StyledText>
                <StyledText style={styles.emoji}>💸  </StyledText>
                <StyledText style={styles.transactionTitle}>EXPENSES</StyledText>
            </StyledText>

            <StyledText style={styles.textTransactionNumber}>
                -€ {totalExpenses.toFixed(2)}
            </StyledText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    transactionTitle: {
        fontSize: 12,
        letterSpacing: 2,
        opacity: 0.8,
        color: 'white'
    },
    emoji: {
        opacity: 1,
        fontSize: 14
    },
    textTransactionNumber: {
        fontSize: 18,
        letterSpacing: 1.5,
        marginVertical: 10,
        color: 'white'
    }
})

export default Expenses;