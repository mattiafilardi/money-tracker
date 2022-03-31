import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useColorScheme from "../../../hooks/useColorScheme";
import Colors from "../../../constants/Colors";

const ExpenseForm = () => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}} style={[styles.button, {backgroundColor: Colors[colorScheme].tint}]}>
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
        color: 'white'
    }
});

export default ExpenseForm;