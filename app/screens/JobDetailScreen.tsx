import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';

export default function JobDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'JobDetail'>>();
  const { job } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{job.customer}</Text>
      <Text style={styles.address}>{job.address}</Text>
      {job.notes ? <Text style={styles.notes}>{job.notes}</Text> : null}
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
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
  },
});
