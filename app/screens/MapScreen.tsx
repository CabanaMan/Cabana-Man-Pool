import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Job } from '../types';
import { loadJobs } from '../database/jobs';

export default function MapScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 37.7849,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    (async () => {
      const j = await loadJobs();
      setJobs(j);
      if (j.length > 0) {
        setRegion((r) => ({ ...r, latitude: j[0].latitude, longitude: j[0].longitude }));
      }
    })();
  }, []);

  return (
    <MapView style={styles.map} region={region}>
      {jobs.map((job) => (
        <Marker
          key={job.id}
          coordinate={{ latitude: job.latitude, longitude: job.longitude }}
          title={job.customer}
          description={job.address}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
