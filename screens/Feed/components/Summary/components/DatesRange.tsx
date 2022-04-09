import React from 'react';
import {formatDate} from "../../../../../utils/dateFormat";
import {StyledText} from "../../../../../components/StyledText";
import {StyleSheet} from "react-native";

interface DatesRangeProps {
    range: {start: string, end: string}
}

const DatesRange: React.VFC<DatesRangeProps> = ({range}) => {
    return (
        <StyledText
            style={styles.date}>{formatDate(range.start)} - {formatDate(range.end)}</StyledText>
    );
};

const styles = StyleSheet.create({
    date: {
        fontSize: 11,
        letterSpacing: 2,
        opacity: 0.9,
        color: 'white'
    }
});

export default DatesRange;