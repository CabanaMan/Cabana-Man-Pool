import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';
import { getJobs } from '../database/database';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadJobs();
    }
  }, [isFocused]);

  const loadJobs = async () => {
    const data = await getJobs();
    const today = new Date().toISOString().slice(0, 10);
    setJobs(data.filter(j => j.lastService.slice(0, 10) !== today || !j.completed));
  };

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
      <Button title="Job List" onPress={() => navigation.navigate('Jobs')} />
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
