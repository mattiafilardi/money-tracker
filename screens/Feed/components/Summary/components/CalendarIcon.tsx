import React from 'react';
import Colors from "../../../../../constants/Colors";
import {Feather} from "@expo/vector-icons";
import useColorScheme from "../../../../../hooks/useColorScheme";

interface CalendarIconProps {
    setOpenCalendarModal: (bool: boolean) => void
}

const CalendarIcon: React.VFC<CalendarIconProps> = ({setOpenCalendarModal}) => {
    const colorScheme = useColorScheme();

    return (
        <Feather name="calendar" size={28} color={Colors[colorScheme].background}
                 onPress={() => setOpenCalendarModal(true)}/>
    );
};

export default CalendarIcon;