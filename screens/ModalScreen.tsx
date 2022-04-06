import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import {useState} from "react";
import {getFirstDayOfMonth, getLastDayOfMonth} from "../utils/dateFormat";
import useColorScheme from "../hooks/useColorScheme";

export default function ModalScreen() {
  return (
    <View style={styles.container}>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
