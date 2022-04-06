import React from 'react';
import {AntDesign} from "@expo/vector-icons";
import {Pressable, StyleSheet} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface GoBackProps {
    navigation: NavigationProp<any>
}

const GoBack: React.FC<GoBackProps> = ({navigation}) => {
    const colorScheme = useColorScheme();

    return (
        <Pressable style={[styles.container, {backgroundColor: Colors[colorScheme].secondaryColor}]} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors[colorScheme].tint} />
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 5
    }
});

export default GoBack;