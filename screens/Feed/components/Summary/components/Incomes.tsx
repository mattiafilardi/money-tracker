import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Transaction} from "../../../../../model/Transaction";

interface IncomesProps {
    setCategory: (category: Transaction['type']) => void,
    totalIncomes: number
}

const Incomes: React.VFC<IncomesProps> = ({setCategory, totalIncomes}) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setCategory('income')}>
            <StyledText>
                <StyledText style={styles.emoji}>🤑  </StyledText>
                <StyledText style={styles.transactionTitle}>INCOMES</StyledText>
            </StyledText>

            <StyledText style={styles.textTransactionNumber}>
                € {totalIncomes.toFixed(2)}
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

export default Incomes;