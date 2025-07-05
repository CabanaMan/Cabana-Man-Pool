import React, { useState, useEffect } from 'react';
import { View, Button, Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(val => setDark(val === 'dark'));
  }, []);

  const toggleTheme = (value: boolean) => {
    setDark(value);
    AsyncStorage.setItem('theme', value ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Dark Mode</Text>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
