import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';
import { loadJobs, toggleJobComplete } from '../database/jobs';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

export default function JobDetailScreen({ route }: Props) {
  const { jobId } = route.params;
  const [job, setJob] = useState<Job | undefined>();

  useEffect(() => {
    (async () => {
      const jobs = await loadJobs();
      setJob(jobs.find((j) => j.id === jobId));
    })();
  }, [jobId]);

  const toggle = async () => {
    const jobs = await toggleJobComplete(jobId);
    setJob(jobs.find((j) => j.id === jobId));
  };

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{job.customer}</Text>
      <Text>{job.address}</Text>
      <Text>Status: {job.completed ? 'Completed' : 'Pending'}</Text>
      <Button title={job.completed ? 'Mark Incomplete' : 'Mark Completed'} onPress={toggle} />
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
});
