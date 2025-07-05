import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CalculatorScreen() {
  const [gallons, setGallons] = useState('');
  const [ppm, setPpm] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calcChlorine = () => {
    const g = parseFloat(gallons);
    const p = parseFloat(ppm);
    if (!isNaN(g) && !isNaN(p)) {
      const ounces = (g * p) / 7500;
      setResult(ounces);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Gallons" value={gallons} onChangeText={setGallons} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="PPM Change" value={ppm} onChangeText={setPpm} keyboardType="numeric" style={styles.input} />
      <Button title="Chlorine Needed" onPress={calcChlorine} />
      {result !== null && <Text style={styles.result}>Ounces: {result.toFixed(2)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  result: { marginTop: 16, fontSize: 18 },
});
