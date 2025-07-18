import React, { useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RootStackParamList, Job } from '../types';
import { getJobs, saveJob } from '../database/database';
import JobItem from '../components/JobItem';

export default function JobListScreen() {
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
    setJobs(data);
  };

  const toggleComplete = (job: Job, value: boolean) => {
    const updated = { ...job, completed: value };
    saveJob(updated);
    loadJobs();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobItem
            job={item}
            onToggle={(val) => toggleComplete(item, val)}
            onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
          />
        )}
      />
      <Button title="Add Job" onPress={() => navigation.navigate('AddJob', {})} />
    </View>
  );
}
