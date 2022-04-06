import React from 'react';
import {StyleSheet, Image, ActivityIndicator} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const Loader = () => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#BAADFF', '#9381FF', '#745CFF']}
            style={styles.container}
        >
            <ActivityIndicator color='white' animating />
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