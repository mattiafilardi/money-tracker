import React from 'react';
import {StyleSheet, Image, ActivityIndicator} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface LoaderProps {
    colors?: string[]
}

const Loader: React.FC<LoaderProps> = ({colors}) => {
    const colorScheme = useColorScheme();

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={colors || []}
            style={styles.container}
        >
            <ActivityIndicator color={Colors[colorScheme].text} animating />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loader;
