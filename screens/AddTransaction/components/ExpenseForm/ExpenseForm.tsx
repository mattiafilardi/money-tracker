import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import useColorScheme from "../../../../hooks/useColorScheme";
import Colors from "../../../../constants/Colors";

interface ExpenseFormProps {
    insertExpense: () => void,
    amount: number
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({insertExpense, amount}) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {insertExpense()}} style={[styles.button, {backgroundColor: Colors[colorScheme].tint}]}>
                <Text style={styles.buttonText}>Add expense</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        padding: 15,
        borderRadius: 40,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.3,
        color: 'white',
        fontFamily: 'Optima'
    }
});

export default ExpenseForm;