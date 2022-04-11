import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Button, FlatList} from "react-native";
import useColorScheme from "../../../../hooks/useColorScheme";
import Colors from "../../../../constants/Colors";
import {MultiSelect} from "../../../../model/Expense";
import {Controller, useForm} from "react-hook-form";
import CategoryListItem from "./components/CategoryListItem";

interface ExpenseFormProps {
    insertExpense: () => void,
    retrieveCategoryProperty: () => Promise<MultiSelect[]>,
    amount: number
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({insertExpense, amount, retrieveCategoryProperty}) => {
    const colorScheme = useColorScheme();
    const [categories, setCategories] = useState<MultiSelect[] | null>(null)

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            date: Date.now(),
            categories: [],
            emoji: null,
            comment: ''
        }
    });

    const onSubmit = (data: any) => {
        console.warn(data);
    }

    useEffect(() => {
        retrieveCategoryProperty().then(categories => setCategories(categories))
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.categoriesContainer}>
                {categories?.map((category, index) => (
                    <CategoryListItem category={category} key={index} />
                ))}
            </View>

            {categories && (
                <>
                    <View style={{ height: 1, marginVertical: 5, backgroundColor: Colors[colorScheme].tint }}/>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={{ flex: 1, borderRadius: 40, backgroundColor: Colors[colorScheme].tint, marginVertical: 10}}
                                       placeholder='Spesa'
                                       placeholderTextColor='white'
                                       onChangeText={onChange}
                                       value={value}
                            />
                        )}
                        name="name"
                    />

                    <TextInput style={{ flex: 1, borderRadius: 40, backgroundColor: Colors[colorScheme].tint, marginVertical: 10 }} placeholder='Data' placeholderTextColor='white'/>

                    <TextInput style={{ flex: 1, borderRadius: 40, backgroundColor: Colors[colorScheme].tint, marginVertical: 10 }} placeholder='Commento' placeholderTextColor='white'/>

                    {/*<TouchableOpacity onPress={() => {insertExpense()}} style={[styles.button, {backgroundColor: Colors[colorScheme].tint}]}>
                        <Text style={styles.buttonText}>Add expense</Text>
                    </TouchableOpacity>*/}

                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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