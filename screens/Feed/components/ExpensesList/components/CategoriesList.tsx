import React from 'react';
import {MultiSelect} from "../../../../../model/Expense";
import {StyledText} from "../../../../../components/StyledText";
import {FlatList, ListRenderItemInfo, StyleSheet} from "react-native";

interface CategoriesListProps {
    categories: MultiSelect[]
}

const CategoriesList: React.FC<CategoriesListProps> = ({categories}) => {
    return (
        <FlatList data={categories} keyExtractor={category => category.id}
                  renderItem={(category: ListRenderItemInfo<MultiSelect>) =>
                      <StyledText style={[styles.textCategory, {marginLeft: 5}]}>
                          {category.item.name.split(' ')[0]}
                      </StyledText>
                  }>
        </FlatList>
    );
};

const styles = StyleSheet.create({
    textCategory: {
        fontSize: 10,
        color: 'grey',
    },
})

export default CategoriesList;