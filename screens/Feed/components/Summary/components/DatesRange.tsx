import React from 'react';
import Colors from "../../../../../constants/Colors";
import {formatDate} from "../../../../../utils/dateFormat";
import {StyledText} from "../../../../../components/StyledText";
import useColorScheme from "../../../../../hooks/useColorScheme";
import {StyleSheet} from "react-native";

interface DatesRangeProps {
    range: {start: string, end: string}
}

const DatesRange: React.VFC<DatesRangeProps> = ({range}) => {
    const colorScheme = useColorScheme()

    return (
        <StyledText
            style={[styles.date, {color: Colors[colorScheme].background}]}>{formatDate(range.start)} - {formatDate(range.end)}</StyledText>
    );
};

const styles = StyleSheet.create({
    date: {
        fontSize: 11,
        letterSpacing: 2,
        opacity: 0.9
    }
});

export default DatesRange;