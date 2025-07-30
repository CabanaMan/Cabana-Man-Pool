import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';
import JobItem from '../components/JobItem';
import { loadJobs } from '../database/jobs';

const defaultJobs: Job[] = [
  { id: '1', customer: 'Smith Family', address: '123 Palm Rd' },
  { id: '2', customer: 'Jones Estate', address: '456 Ocean Ave' },
  { id: '3', customer: 'Liu Residence', address: '789 Sunset Blvd' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadJobs().then((stored) => {
      if (stored.length === 0) {
        setJobs(defaultJobs);
      } else {
        setJobs(stored);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Jobs ({jobs.length})</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobItem
            job={item}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
          />
        )}
      />
      <Button title="View Route Map" onPress={() => navigation.navigate('Map', { jobs })} />
      <Button
        title="Chemical Calculator"
        onPress={() => navigation.navigate('ChemCalc')}
      />
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
});
