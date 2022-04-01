import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {View} from '../../../components/Themed'
import useColorScheme from "../../../hooks/useColorScheme";
import Colors from "../../../constants/Colors";
import {StyledText} from "../../../components/StyledText";

const IncomeForm = () => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}} style={[styles.button, {backgroundColor: Colors[colorScheme].tint}]}>
                <Text style={styles.buttonText}>Add income</Text>
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

export default IncomeForm;