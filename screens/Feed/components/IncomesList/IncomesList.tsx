import React, {useState} from 'react';
import {Expense} from "../../../../model/Expense";
import {FlatList, ListRenderItemInfo, RefreshControl, SafeAreaView, StyleSheet, View} from "react-native";
import {Income} from "../../../../model/Income";
import IncomesListItem from "./components/IncomesListItem";

interface IncomesListProps {
    incomes: Income[] | null,
    getIncomes: (start: string, end : string) => void,
    datesRange: {start: string, end: string}
}

const IncomesList: React.FC<IncomesListProps> = ({incomes, getIncomes, datesRange}) => {
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setRefreshing(true);
        getIncomes(datesRange.start, datesRange.end)
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={incomes}
                keyExtractor={(expense : Income) => expense.id}
                renderItem={({item}: ListRenderItemInfo<Income>) => <IncomesListItem income={item} />}
                initialNumToRender={4}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'grey'
    }
});

export default IncomesList;