import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Transaction} from "../../../../model/Transaction";
import {LinearGradient} from 'expo-linear-gradient';
import Balance from "./components/Balance";
import Incomes from "./components/Incomes";
import Expenses from "./components/Expenses";
import CalendarModal from "../../../../components/CalendarModal";
import CalendarIcon from "./components/CalendarIcon";
import DatesRange from './components/DatesRange';
import useColorScheme from "../../../../hooks/useColorScheme";
import useTheme from "../../../../hooks/useTheme";

type DatesRange = { start: string, end: string }

interface SummaryProps {
    totalExpenses: number,
    totalIncomes: number,
    setCategory: (category: Transaction['type']) => void,
    datesRange: any,
    setDatesRange: (range: DatesRange) => void
}

const Summary: React.FC<SummaryProps> = ({totalExpenses, totalIncomes, setCategory, datesRange, setDatesRange}) => {
    const [calendarModal, setOpenCalendarModal] = useState<boolean>(false)
    const {toggleTheme} = useColorScheme()

    return (
        <LinearGradient
            colors={['#745CFF', '#9381FF', '#BAADFF']}
            style={{flex: 1}}
        >
            <CalendarModal visible={calendarModal} setVisible={setOpenCalendarModal} datesRange={datesRange}
                           setDatesRange={setDatesRange}/>

            <View style={styles.summaryContainer}>
                <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
                    <CalendarIcon setOpenCalendarModal={setOpenCalendarModal} />

                    <DatesRange range={datesRange} />

                    <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" onPress={() => toggleTheme()}/>
                </View>

                <Balance totalIncomes={totalIncomes} totalExpenses={totalExpenses}/>

                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                    <Incomes totalIncomes={totalIncomes} setCategory={setCategory}/>
                    <Expenses totalExpenses={totalExpenses} setCategory={setCategory}/>
                </View>
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    row: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20
    },
});


export default Summary;
