import React, {useEffect, useState} from 'react';
import {Income} from "../../../../model/Income";
import {Expense} from "../../../../model/Expense";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import Colors from "../../../../constants/Colors";
import useColorScheme from "../../../../hooks/useColorScheme";
import {StyledText} from "../../../../components/StyledText";

interface SummaryProps {
    expenses: Expense[] | null,
    incomes: Income[] | null
}

const Summary: React.FC<SummaryProps> = ({expenses, incomes}) => {
    const colorScheme = useColorScheme();
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [totalIncomes, setTotalIncomes] = useState<number>(0)

    useEffect(() => {
        const totalExpenses = expenses?.reduce((prev, current) => prev + current.properties.Amount.number, 0)
        const totalIncomes = incomes?.reduce((prev, current) => prev + current.properties.Amount.number, 0)

        setTotalExpenses(totalExpenses || 0);
        setTotalIncomes(totalIncomes || 0);
    }, [expenses, incomes])

    return (
        <SafeAreaView style={[styles.summaryContainer, {backgroundColor: Colors[colorScheme].tint}]}>
            <View style={{ flex: 1, marginTop: 100 }}>
                <View style={styles.currentBalance}>
                    <StyledText style={[styles.textBalance, {color: Colors[colorScheme].background}]}>
                        CURRENT BALANCE
                    </StyledText>
                    <StyledText style={[styles.textBalanceNumber, {color: Colors[colorScheme].background}]}>
                        € {(totalIncomes - totalExpenses).toFixed(2)}
                    </StyledText>
                </View>

                <View style={styles.row}>
                    <View style={{ alignItems: 'center' }}>
                        <StyledText>
                            <StyledText style={styles.emoji}>🤑  </StyledText>
                            <StyledText style={[styles.textBalance, {color: Colors[colorScheme].background}]}>INCOMES</StyledText>
                        </StyledText>

                        <StyledText style={[styles.textTransactionNumber, {color: Colors[colorScheme].background}]}>
                            € {totalIncomes.toFixed(2)}
                        </StyledText>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <StyledText>
                            <StyledText style={styles.emoji}>💸  </StyledText>
                            <StyledText style={[styles.textBalance, {color: Colors[colorScheme].background}]}>EXPENSES</StyledText>
                        </StyledText>

                        <StyledText style={[styles.textTransactionNumber, {color: Colors[colorScheme].background}]}>
                            -€ {totalExpenses.toFixed(2)}
                        </StyledText>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        flex: 1,
    },
    currentBalance: {
        flex: 1,
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textBalance: {
        fontSize: 12,
        letterSpacing: 2,
        opacity: 0.7
    },
    textBalanceNumber: {
        fontSize: 36,
        letterSpacing: 3,
        marginVertical: 10
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
});


export default Summary;