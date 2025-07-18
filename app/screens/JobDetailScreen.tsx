import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { RootStackParamList, Job, ServiceLog } from '../types';
import { getJobs, saveJob, addServiceLog, getServiceLogs } from '../database/database';

export default function JobDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'JobDetail'>>();
  const [job, setJob] = useState<Job | null>(null);
  const [notes, setNotes] = useState('');
  const [chlorine, setChlorine] = useState('');
  const [ph, setPh] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [logs, setLogs] = useState<ServiceLog[]>([]);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const data = await getJobs();
    const j = data.find((d) => d.id === route.params.jobId);
    if (j) {
      setJob(j);
      setNotes(j.notes);
      loadLogs(j.id);
    }
  };

  const loadLogs = async (jobId: string) => {
    const entries = await getServiceLogs(jobId);
    setLogs(entries);
  };

  const saveNotes = () => {
    if (!job) return;
    const updated = { ...job, notes };
    saveJob(updated);
    navigation.goBack();
  };

  const saveLog = () => {
    if (!job) return;
    const log: ServiceLog = {
      id: uuid.v4().toString(),
      jobId: job.id,
      date: new Date().toISOString(),
      chlorine: parseFloat(chlorine),
      ph: parseFloat(ph),
      alkalinity: parseFloat(alkalinity),
      chemicalsAdded: '',
    };
    addServiceLog(log);
    setChlorine('');
    setPh('');
    setAlkalinity('');
    loadLogs(job.id);
  };

  if (!job) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.customer}</Text>
      <Text>{job.address}</Text>
      <TextInput value={notes} onChangeText={setNotes} placeholder="Notes" style={styles.input} multiline />
      <Button title="Save Notes" onPress={saveNotes} />

      <Text style={styles.section}>Log Readings</Text>
      <TextInput value={chlorine} onChangeText={setChlorine} placeholder="Chlorine" keyboardType="numeric" style={styles.input} />
      <TextInput value={ph} onChangeText={setPh} placeholder="pH" keyboardType="numeric" style={styles.input} />
      <TextInput value={alkalinity} onChangeText={setAlkalinity} placeholder="Alkalinity" keyboardType="numeric" style={styles.input} />
      <Button title="Save Log" onPress={saveLog} />

      <Text style={styles.section}>Service History</Text>
      {logs.map((l) => (
        <View key={l.id} style={styles.logItem}>
          <Text>{new Date(l.date).toLocaleString()}</Text>
          <Text>Cl: {l.chlorine} pH: {l.ph} Alk: {l.alkalinity}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  section: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  logItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingVertical: 4,
  },
});
