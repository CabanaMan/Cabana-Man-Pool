import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../types';

interface Props {
  job: Job;
  onPress?: () => void;
}

export default function JobItem({ job, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.customer}>{job.customer}</Text>
      {job.address ? <Text style={styles.address}>{job.address}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  customer: {
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
});
