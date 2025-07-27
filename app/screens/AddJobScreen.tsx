import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { RootStackParamList, Job } from '../types';
import { saveJob, getJobs } from '../database/database';

export default function AddJobScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddJob'>>();

  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [poolSize, setPoolSize] = useState('15000');

  useEffect(() => {
    if (route.params.jobId) {
      loadJob(route.params.jobId);
    }
  }, []);

  const loadJob = async (id: string) => {
    const data = await getJobs();
    const job = data.find(j => j.id === id);
    if (job) {
      setCustomer(job.customer);
      setAddress(job.address);
      setNotes(job.notes);
    }
  };

  const save = () => {
    const job: Job = {
      id: route.params.jobId || uuid.v4().toString(),
      customer,
      address,
      notes,
      poolSize: parseInt(poolSize) || 0,
      services: '',
      lastService: new Date().toISOString(),
      completed: false,
      latitude: 0,
      longitude: 0,
    };
    saveJob(job);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Customer" value={customer} onChangeText={setCustomer} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput
        placeholder="Pool Size (gallons)"
        value={poolSize}
        onChangeText={setPoolSize}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} style={styles.input} />
      <Button title="Save" onPress={save} />
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
});
