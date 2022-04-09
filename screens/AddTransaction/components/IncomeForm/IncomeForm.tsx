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

interface IncomeFormProps {
    insertIncome: () => void,
    retrieveCategoryProperty: () => Promise<MultiSelect[]>,
    amount: number
}

const IncomeForm: React.FC<IncomeFormProps> = ({insertIncome, amount, retrieveCategoryProperty}) => {
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
        <View
            style={styles.container}
        >
            <FlatList
                data={categories}
                numColumns={4}
                style={{ flexGrow: 0 }}
                scrollEnabled={false}
                contentContainerStyle={{ alignItems: 'flex-start' }}
                renderItem={(category) => (
                    <View style={{ height: 75, width: 70, alignItems: 'center', marginHorizontal: 5, marginVertical: 10}}>
                        <View style={{ borderRadius: 50, height: 50, width: 50, backgroundColor: Colors[colorScheme].tint}} />
                        <Text style={{ marginTop: 10}}>{category.item.name}</Text>
                    </View>
                )}
            />

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