import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';
import { loadJobs } from '../database/jobs';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    (async () => {
      const j = await loadJobs();
      setJobs(j);
    })();
  }, []);

  const renderItem = ({ item }: { item: Job }) => (
    <Pressable
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
      style={styles.jobItem}
    >
      <Text style={styles.jobText}>{item.customer}</Text>
      <Text style={styles.jobAddress}>{item.address}</Text>
      <Text style={styles.status}>{item.completed ? '✓ Completed' : 'Pending'}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Jobs ({jobs.length})</Text>
      <FlatList data={jobs} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <Button title="View Route Map" onPress={() => navigation.navigate('Map')} />
      <Button title="Chemical Calculator" onPress={() => navigation.navigate('Calculator')} />
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
  status: {
    fontSize: 12,
    color: '#007700',
  },
});
