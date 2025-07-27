import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { getJobs, saveJob } from '../database/database';
import { Job } from '../types';

function haversine(a: Job, b: Job) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const aVal =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

function optimizeRoute(list: Job[]): Job[] {
  if (list.length <= 2) return list;
  const remaining = [...list];
  const result: Job[] = [];
  let current = remaining.shift() as Job;
  result.push(current);
  while (remaining.length) {
    let nearestIndex = 0;
    let nearestDist = haversine(current, remaining[0]);
    for (let i = 1; i < remaining.length; i++) {
      const dist = haversine(current, remaining[i]);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIndex = i;
      }
    }
    current = remaining.splice(nearestIndex, 1)[0];
    result.push(current);
  }
  return result;
}

export default function MapScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    const coords = data.map((j, i) => ({
      ...j,
      latitude: j.latitude || 37.78 + i * 0.01,
      longitude: j.longitude || -122.43 + i * 0.01,
    }));
    coords.forEach(j => saveJob(j));
    setJobs(optimizeRoute(coords));
  };

  const initialRegion = jobs.length
    ? {
        latitude: jobs[0].latitude,
        longitude: jobs[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {jobs.map(j => (
          <Marker key={j.id} coordinate={{ latitude: j.latitude, longitude: j.longitude }} title={j.customer} />
        ))}
        <Polyline coordinates={jobs.map(j => ({ latitude: j.latitude, longitude: j.longitude }))} strokeColor="blue" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
