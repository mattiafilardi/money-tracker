import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../../../../constants/Colors";
import {MultiSelect} from "../../../../../model/Income";
import useColorScheme from "../../../../../hooks/useColorScheme";

interface CategoryListItemProps {
    category: MultiSelect,
    removeCategory: (id: string) => void,
    addCategory: (category: MultiSelect) => void
}

const CategoryListItem: React.VFC<CategoryListItemProps> = ({category, addCategory, removeCategory}) => {
    const colorScheme = useColorScheme()
    const [selected, setSelected] = useState<boolean>(false)

    return (
        <Pressable style={styles.container}
            onPress={() => {
                selected ? removeCategory(category.id) : addCategory(category)
                setSelected(selected => !selected)
            }}>
            <View style={[styles.icon, {
                borderColor: Colors[colorScheme].secondaryColor,
                backgroundColor: selected ? Colors[colorScheme].tint : Colors[colorScheme].background
            }]}/>
            <Text style={[styles.categoryName, {color: Colors[colorScheme].text}]}>{category.name}</Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 75,
        width: 70,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10
    },
    icon: {
        borderRadius: 50,
        borderWidth: 2,
        height: 50,
        width: 50
    },
    categoryName: {
        fontSize: 12,
        marginTop: 10,
    }
});

export default CategoryListItem;