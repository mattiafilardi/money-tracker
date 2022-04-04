import {StyleSheet} from 'react-native';
import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import {useExpenses} from "../../hooks/useExpenses";
import ExpensesList from "./components/ExpensesList/ExpensesList";
import {useIncomes} from "../../hooks/useIncomes";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import Summary from "./components/Summary/Summary";
import Loader from "../../components/Loader";

export default function FeedScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const {isLoading : isLoadingExpenses, expenses, getExpenses} = useExpenses();
    const {isLoading: isLoadingIncomes, incomes} = useIncomes()
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, {backgroundColor: Colors[colorScheme].tint}]}>
            <Summary expenses={expenses} incomes={incomes} />

            {isLoadingExpenses || isLoadingIncomes ? <Loader /> : (
                <View style={styles.transactionsContainer}>
                    <ExpensesList expenses={expenses} getExpenses={getExpenses}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    transactionsContainer: {
        flex: 1,
        padding: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    }
});
