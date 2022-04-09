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
            <StyledText style={styles.textBalance}>
                CURRENT BALANCE
            </StyledText>
            <StyledText style={styles.textBalanceNumber}>
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
        opacity: 0.8,
        color: 'white'
    },
    textBalanceNumber: {
        fontSize: 36,
        letterSpacing: 3,
        marginVertical: 10,
        color: 'white'
    }
});


export default Balance;