import {StyleSheet} from 'react-native';
import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import {useExpenses} from "../../hooks/useExpenses";
import ExpensesList from "./components/ExpensesList/ExpensesList";
import {useIncomes} from "../../hooks/useIncomes";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

export default function FeedScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes()
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, {backgroundColor: Colors[colorScheme].tint}]}>
      <View style={styles.transactionsContainer}>
        <ExpensesList expenses={expenses} />
      </View>

    </View>
  );
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
    marginTop: 300
  }
});
