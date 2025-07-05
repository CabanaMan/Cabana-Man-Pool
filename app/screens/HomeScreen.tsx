import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';

const jobs: Job[] = [
  { id: '1', customer: 'Smith Family', address: '123 Palm Rd' },
  { id: '2', customer: 'Jones Estate', address: '456 Ocean Ave' },
  { id: '3', customer: 'Liu Residence', address: '789 Sunset Blvd' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Jobs ({jobs.length})</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <Text style={styles.jobText}>{item.customer}</Text>
            <Text style={styles.jobAddress}>{item.address}</Text>
          </View>
        )}
      />
      <Button title="View Route Map" onPress={() => navigation.navigate('Map')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  jobItem: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  jobText: {
    fontSize: 16,
  },
  jobAddress: {
    fontSize: 14,
    color: '#555',
  },
});
