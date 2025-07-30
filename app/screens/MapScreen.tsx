import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Job } from '../types';

export default function MapScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Map'>>();
  const jobs: Job[] = route.params?.jobs || [];
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject}>
        {jobs.map((job) =>
          job.location ? (
            <Marker
              key={job.id}
              coordinate={job.location}
              title={job.customer}
              description={job.address}
            />
          ) : null
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
