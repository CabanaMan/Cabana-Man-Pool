import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function ChemicalCalculatorScreen() {
  const [volume, setVolume] = useState('');
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(volume);
    const c = parseFloat(current);
    const t = parseFloat(target);
    if (!isNaN(v) && !isNaN(c) && !isNaN(t)) {
      const ppmNeeded = t - c;
      const ounces = (ppmNeeded * v) / 10000; // simple approximation
      setResult(ounces);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chlorine Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Pool volume (gallons)"
        keyboardType="numeric"
        value={volume}
        onChangeText={setVolume}
      />
      <TextInput
        style={styles.input}
        placeholder="Current chlorine ppm"
        keyboardType="numeric"
        value={current}
        onChangeText={setCurrent}
      />
      <TextInput
        style={styles.input}
        placeholder="Target chlorine ppm"
        keyboardType="numeric"
        value={target}
        onChangeText={setTarget}
      />
      <Button title="Calculate" onPress={calculate} />
      {result !== null && (
        <Text style={styles.result}>Add {result.toFixed(1)} oz of chlorine.</Text>
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
    marginBottom: 8,
  },
  result: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
