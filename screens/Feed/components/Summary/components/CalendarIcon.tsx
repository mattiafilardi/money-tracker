import React from 'react';
import {AntDesign} from "@expo/vector-icons";

interface CalendarIconProps {
    setOpenCalendarModal: (bool: boolean) => void
}

const CalendarIcon: React.VFC<CalendarIconProps> = ({setOpenCalendarModal}) => {

    return (
        <AntDesign name="calendar" size={28} color='white'
                   onPress={() => setOpenCalendarModal(true)}/>
    );
};

export default CalendarIcon;