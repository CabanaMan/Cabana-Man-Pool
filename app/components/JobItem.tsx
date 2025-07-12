import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Job } from '../types';

interface Props {
  job: Job;
  onToggle: (value: boolean) => void;
  onPress: () => void;
}

export default function JobItem({ job, onToggle, onPress }: Props) {
  return (
    <View style={styles.row}>
      <Checkbox value={job.completed} onValueChange={onToggle} />
      <Text style={styles.text} onPress={onPress}>
        {job.customer} - {job.address}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
});
