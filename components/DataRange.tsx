import React, {useEffect, useState} from 'react'
import {Calendar, DateData} from 'react-native-calendars'
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
const XDate = require('xdate');

interface DataRangeProps {
    initialRange: [fromDate: DateData['dateString'], toDate: DateData['dateString']],
    onSuccess: (fromDate: DateData['dateString'], toDate: DateData['dateString']) => void,
    theme: { markColor: string, markTextColor: string }
}

const DataRange: React.FC<DataRangeProps> = ({initialRange, onSuccess, theme}) => {
    const colorScheme = useColorScheme()
    const [state, setState]= useState({isFromDatePicked: false, isToDatePicked: false, markedDates: {}, fromDate: ''})

    const setupMarkedDates = (fromDate: DateData['dateString'], toDate: DateData['dateString'], markedDates: any) => {
        let mFromDate = new XDate(fromDate)
        let mToDate = new XDate(toDate)
        let range = mFromDate.diffDays(mToDate)
        if (range >= 0) {
            if (range == 0) {
                markedDates = {[toDate]: {color: theme.markColor, textColor: theme.markTextColor}}
            } else {
                for (let i = 1; i <= range; i++) {
                    let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
                    if (i < range) {
                        markedDates[tempDate] = {color: theme.markColor, textColor: theme.markTextColor}
                    } else {
                        markedDates[tempDate] = {endingDay: true, color: theme.markColor, textColor: theme.markTextColor}
                    }
                }
            }
        }
        return [markedDates, range]
    }

    const setupInitialRange = () => {
        if (!initialRange) return
        let [fromDate, toDate] = initialRange
        let markedDates = {[fromDate]: {startingDay: true, color: theme.markColor, textColor: theme.markTextColor}}
        let [mMarkedDates] = setupMarkedDates(fromDate, toDate, markedDates)
        setState({...state, markedDates: mMarkedDates, fromDate: fromDate})
    }

    useEffect(() => {
       setupInitialRange();
    }, [])


    const setupStartMarker = (day: DateData) => {
        let markedDates = {[day.dateString]: {startingDay: true, color: theme.markColor, textColor: theme.markTextColor}}
        setState({isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates})
    }

    const onDayPress = (day: DateData) => {
        if (!state.isFromDatePicked || (state.isFromDatePicked && state.isToDatePicked)) {
            setupStartMarker(day)
        } else if (!state.isToDatePicked) {
            let markedDates = {...state.markedDates}
            let [mMarkedDates, range] = setupMarkedDates(state.fromDate, day.dateString, markedDates)
            if (range >= 0) {
                setState({...state, isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates})
                onSuccess(state.fromDate, day.dateString)
            } else {
                setupStartMarker(day)
            }
        }
    }

    return (
        <Calendar
            markingType={'period'}
            current={state.fromDate}
            markedDates={state.markedDates}
            onDayPress={(day) => {onDayPress(day)}}
            style={{
                borderWidth: 0.5,
                borderRadius: 20,
                borderColor: Colors[colorScheme].tint,
                height: 350
            }}
            theme={{
                backgroundColor: Colors[colorScheme].background,
                calendarBackground: Colors[colorScheme].background,
                textSectionTitleColor: Colors[colorScheme].tabIconDefault,
                textSectionTitleDisabledColor: Colors[colorScheme].tabIconDefault,
                selectedDayTextColor: Colors[colorScheme].text,
                todayTextColor: Colors[colorScheme].tint,
                dayTextColor: Colors[colorScheme].text,
                textDisabledColor: Colors[colorScheme].tabIconDefault,
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: Colors[colorScheme].tint,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: Colors[colorScheme].tint,
                indicatorColor: 'blue',
                textDayFontFamily: 'Optima',
                textMonthFontFamily: 'Optima',
                textMonthFontWeight: 'bold',
                textDayHeaderFontFamily: 'Optima',
                textDayFontWeight: '300',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
        />
    );
};

export default DataRange;