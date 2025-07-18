import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CHEMICAL_FACTORS: Record<string, number> = {
  Chlorine: 7500,
  Acid: 10600,
  'Baking Soda': 7300,
  Stabilizer: 12600,
  Salt: 1200,
};

export default function CalculatorScreen() {
  const [gallons, setGallons] = useState('');
  const [ppm, setPpm] = useState('');
  const [chemical, setChemical] = useState<keyof typeof CHEMICAL_FACTORS>('Chlorine');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const g = parseFloat(gallons);
    const p = parseFloat(ppm);
    if (!isNaN(g) && !isNaN(p)) {
      const factor = CHEMICAL_FACTORS[chemical];
      const ounces = (g * p) / factor;
      setResult(ounces);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Gallons"
        value={gallons}
        onChangeText={setGallons}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="PPM Change"
        value={ppm}
        onChangeText={setPpm}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={chemical}
        onValueChange={(val: keyof typeof CHEMICAL_FACTORS) => setChemical(val)}
      >
        {Object.keys(CHEMICAL_FACTORS).map(key => (
          <Picker.Item label={key} value={key} key={key} />
        ))}
      </Picker>
      <Button title="Calculate" onPress={calculate} />
      {result !== null && (
        <Text style={styles.result}>
          Ounces of {chemical}: {result.toFixed(2)}
        </Text>
      )}
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
