import React from 'react';
import DataRange from "./DataRange";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Modal from "react-native-modal";

type DatesRange = {start: string, end: string}

interface CalendarModalProps {
    visible: boolean,
    setVisible: (bool: boolean) => void
    datesRange: DatesRange
    setDatesRange: (range: DatesRange) => void
}

const CalendarModal: React.FC<CalendarModalProps> = ({visible, setVisible, datesRange, setDatesRange}) => {
    const colorScheme = useColorScheme()

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.4}
            onBackdropPress={() => setVisible(false)}
        >
            <DataRange
                initialRange={[datesRange.start, datesRange.end]}
                onSuccess={(s, e) => setDatesRange({
                    start: s, end: e
                })}
                theme={{markColor: Colors[colorScheme.mode].tint, markTextColor: Colors[colorScheme.mode].background}}
            />
        </Modal>
    );
};

export default CalendarModal;
