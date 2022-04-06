import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import Colors from "../../../../../constants/Colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import useColorScheme from "../../../../../hooks/useColorScheme";
import {Transaction} from "../../../../../model/Transaction";

interface IncomesProps {
    setCategory: (category: Transaction['type']) => void,
    totalIncomes: number
}

const Incomes: React.VFC<IncomesProps> = ({setCategory, totalIncomes}) => {
    const colorScheme = useColorScheme()

    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setCategory('income')}>
            <StyledText>
                <StyledText style={styles.emoji}>🤑  </StyledText>
                <StyledText style={[styles.transactionTitle, {color: Colors[colorScheme].background}]}>INCOMES</StyledText>
            </StyledText>

            <StyledText style={[styles.textTransactionNumber, {color: Colors[colorScheme].background}]}>
                € {totalIncomes.toFixed(2)}
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

export default Incomes;