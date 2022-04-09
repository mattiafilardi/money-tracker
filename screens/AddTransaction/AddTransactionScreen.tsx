import {Keyboard, SafeAreaView, StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native';

import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import GoBack from "../../components/GoBack";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import {useState} from "react";
import {Transaction} from "../../model/Transaction";
import TransactionSwitch from "./components/TransactionSwitch";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import {useIncomes} from "../../hooks/useIncomes";
import {useExpenses} from "../../hooks/useExpenses";

export default function AddTransactionScreen({navigation}: RootTabScreenProps<'AddTab'>) {
    const colorScheme = useColorScheme();

    const {retrieveCategoryProperty, insertIncome} = useIncomes()
    const {insertExpense} = useExpenses();

    const [transactionType, setTransactionType] = useState<Transaction['type']>('expense')
    const [transactionAmount, setTransactionAmount] = useState<number>(0);

    // TODO: emoji picker, finish income form (React Hook Form), call api after input fields have been filled

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
            <View style={styles.header}>
                <GoBack navigation={navigation}/>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.inputContainer}>
                    <TextInput keyboardType='numeric'
                               onChangeText={(text) => setTransactionAmount(Number(text))}
                               style={styles.amountInput}
                               placeholder="0  EUR €"
                               placeholderTextColor={Colors[colorScheme].tabIconDefault}
                    />
                </View>
            </TouchableWithoutFeedback>

            <TransactionSwitch transactionType={transactionType} setTransactionType={setTransactionType}/>

            {transactionType === 'expense' && <ExpenseForm insertExpense={insertExpense} amount={transactionAmount}/>}

            {transactionType === 'income' && <IncomeForm insertIncome={insertIncome} amount={transactionAmount}
                                                         retrieveCategoryProperty={retrieveCategoryProperty}/>}
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
    inputContainer: {
        marginTop: 5,
        marginBottom: 15,
        alignItems: 'center'
    },
    amountInput: {
        height: 50,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'Optima'
    }
});
