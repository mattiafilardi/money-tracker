import React from 'react';
import {View} from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Transaction} from "../model/Transaction";
import useColorScheme from "../../../hooks/useColorScheme";

interface TransactionSwitchProps {
    transactionType: Transaction['type'],
    setTransactionType: (transactionType : Transaction['type']) => void
}

const TransactionSwitch: React.VFC<TransactionSwitchProps> = ({transactionType, setTransactionType}) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.switchContainer}>
            <View style={[styles.switch, {backgroundColor: Colors[colorScheme].secondaryColor}]}>
                <TouchableOpacity
                    onPress={() => {setTransactionType('expense')}}
                    style={[styles.switchButton, {backgroundColor: transactionType === 'expense' ? Colors[colorScheme].tint : Colors[colorScheme].secondaryColor}]}>
                    <Text style={
                        [styles.switchButtonText, {color: transactionType === 'expense' ? Colors[colorScheme].background : Colors[colorScheme].tint}]
                    }>EXPENSE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {setTransactionType('income')}}
                    style={[styles.switchButton, {backgroundColor: transactionType === 'income' ? Colors[colorScheme].tint : Colors[colorScheme].secondaryColor}]}>
                    <Text style={
                        [styles.switchButtonText, {color: transactionType === 'income' ? Colors[colorScheme].background : Colors[colorScheme].tint}]
                    }>INCOME</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        width: 220,
        flexDirection: 'row',
        borderRadius: 40,
        justifyContent: 'space-between'
    },
    switchButton: {
        width: 105,
        borderRadius: 40,
        padding: 12,
        alignItems: 'center',
    },
    switchButtonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3
    }
});

export default TransactionSwitch;