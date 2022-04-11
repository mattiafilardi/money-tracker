import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import {View} from '../../../../components/Themed'
import useColorScheme from "../../../../hooks/useColorScheme";
import Colors from "../../../../constants/Colors";
import {MultiSelect} from "../../../../model/Income";
import { useForm, Controller } from "react-hook-form";
import CategoryListItem from "./components/CategoryListItem";

interface IncomeFormProps {
    insertIncome: () => void,
    retrieveCategoryProperty: () => Promise<MultiSelect[]>,
    amount: number
}

const IncomeForm: React.FC<IncomeFormProps> = ({insertIncome, amount, retrieveCategoryProperty}) => {
    const colorScheme = useColorScheme();

    const [categories, setCategories] = useState<MultiSelect[] | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<MultiSelect[] | []>([])

    const addCategory = (category: MultiSelect) => {
        const categories = [...selectedCategories, category]
        setSelectedCategories(categories)
    }

    const removeCategory = (id: string) => {
        const categories = selectedCategories.filter(category => category.id !== id)
        setSelectedCategories(categories)
    }

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
        <View
            style={styles.container}
        >

            <View style={styles.categoriesContainer}>
                {categories?.map(category => (
                    <CategoryListItem category={category} key={category.id} addCategory={addCategory} removeCategory={removeCategory} />
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
                                       placeholder='Entrata'
                                       placeholderTextColor='white'
                                       onChangeText={onChange}
                                       value={value}
                            />
                        )}
                        name="name"
                    />

                    <TextInput style={{ flex: 1, borderRadius: 40, backgroundColor: Colors[colorScheme].tint, marginVertical: 10 }} placeholder='Data' placeholderTextColor='white'/>

                    <TextInput style={{ flex: 1, borderRadius: 40, backgroundColor: Colors[colorScheme].tint, marginVertical: 10 }} placeholder='Commento' placeholderTextColor='white'/>

                    {/*<TouchableOpacity onPress={() => {handleSubmit(onSubmit)}} style={[styles.button, {backgroundColor: Colors[colorScheme].tint}]}>
                        <Text style={styles.buttonText}>Add income</Text>
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
        padding: 20,
        marginTop: 20,
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