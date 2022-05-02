import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import GoBack from "../../components/GoBack";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import React, {useState} from "react";
import {Transaction} from "../../model/Transaction";
import TransactionSwitch from "./components/TransactionSwitch";
import {useIncomes} from "../../hooks/useIncomes";
import {useExpenses} from "../../hooks/useExpenses";
import AmountInput from "./components/Form/components/AmountInput";
import Form, {Category} from "./components/Form/Form";
import SendTransactionButton from "./components/SendTransactionButton";
import {TransactionForm} from "../../model/TransactionForm";

const initialFormData = {
    name: '',
    comment: '',
    date: new Date(),
    emoji: '',
    categories: [] as Category[],
    amount: 0,
    error: {name: false, amount: false}
}

export default function AddTransactionScreen({navigation}: RootTabScreenProps<'AddTab'>) {
    const colorScheme = useColorScheme();

    const {isLoading: isLoadingIncomes, retrieveCategoryProperty: retrieveIncomeCategoryProperty, insertIncome} = useIncomes()
    const {isLoading: isLoadingExpenses, retrieveCategoryProperty : retrieveExpenseCategoryProperty, insertExpense} = useExpenses();

    const [transactionType, setTransactionType] = useState<Transaction['type']>('expense')

    const [formValues, setFormValues] = useState<TransactionForm>(initialFormData)

    const onSubmit = (data: TransactionForm) => {
        setFormValues({...formValues, error: {amount: true, name: true}})



    }

    // TODO: emoji picker, finish form, call api after input fields have been filled

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
            <View style={styles.header}>
                <GoBack navigation={navigation}/>
            </View>

            <AmountInput formValues={formValues} setFormValues={setFormValues} />

            <TransactionSwitch transactionType={transactionType} setTransactionType={setTransactionType} />

            <View style={[styles.divider, {backgroundColor: Colors[colorScheme].tint}]}/>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flexShrink: 1, marginBottom: 10 }}>
                <Form
                    isLoading={isLoadingExpenses || isLoadingIncomes}
                    transactionType={transactionType}
                    retrieveCategoryProperty={transactionType === 'income' ? retrieveIncomeCategoryProperty : retrieveExpenseCategoryProperty}
                    formValues={formValues} setFormValues={setFormValues}
                />

                <SendTransactionButton
                    formValues={formValues}
                    message={transactionType === 'income' ? 'Add income' : 'Add expense'}
                    onSubmit={onSubmit}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 5
    },
    divider: {
        height: 1,
        marginTop: 40,
    },
});
