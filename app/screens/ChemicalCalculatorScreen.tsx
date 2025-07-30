import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ChemicalCalculatorScreen() {
  const [volume, setVolume] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(volume);
    if (!isNaN(v)) {
      // Extremely simplified: chlorine ounces = volume * 0.00013
      setResult(v * 0.00013);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemical Calculator</Text>
      <TextInput
        placeholder="Pool volume (gallons)"
        keyboardType="numeric"
        value={volume}
        onChangeText={setVolume}
        style={styles.input}
      />
      <Button title="Calculate" onPress={calculate} />
      {result !== null && (
        <Text style={styles.result}>Ounces of chlorine: {result.toFixed(2)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  result: {
    marginTop: 12,
    fontSize: 16,
  },
});
