import React from 'react';
import {StyledText} from "../../../../../components/StyledText";
import Colors from "../../../../../constants/Colors";
import {StyleSheet, View} from "react-native";
import useColorScheme from "../../../../../hooks/useColorScheme";

interface BalanceProps {
    totalIncomes: number,
    totalExpenses: number
}

const Balance: React.VFC<BalanceProps> = ({totalIncomes, totalExpenses}) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.currentBalance}>
            <StyledText style={[styles.textBalance, {color: Colors[colorScheme].background}]}>
                CURRENT BALANCE
            </StyledText>
            <StyledText style={[styles.textBalanceNumber, {color: Colors[colorScheme].background}]}>
                € {(totalIncomes - totalExpenses).toFixed(2)}
            </StyledText>
        </View>
    );
};
const styles = StyleSheet.create({
    currentBalance: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBalance: {
        fontSize: 12,
        letterSpacing: 2,
        opacity: 0.8
    },
    textBalanceNumber: {
        fontSize: 36,
        letterSpacing: 3,
        marginVertical: 10
    }
});


export default Balance;