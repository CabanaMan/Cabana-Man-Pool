import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';

const STORAGE_KEY = 'jobs';

const defaultJobs: Job[] = [
  { id: '1', customer: 'Smith Family', address: '123 Palm Rd', latitude: 37.7749, longitude: -122.4194, completed: false },
  { id: '2', customer: 'Jones Estate', address: '456 Ocean Ave', latitude: 37.7849, longitude: -122.4094, completed: false },
  { id: '3', customer: 'Liu Residence', address: '789 Sunset Blvd', latitude: 37.7949, longitude: -122.4294, completed: false },
];

export async function loadJobs(): Promise<Job[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Job[];
    }
  } catch {}
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultJobs));
  return defaultJobs;
}

export async function saveJobs(jobs: Job[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export async function toggleJobComplete(id: string): Promise<Job[]> {
  const jobs = await loadJobs();
  const updated = jobs.map((j) =>
    j.id === id ? { ...j, completed: !j.completed } : j
  );
  await saveJobs(updated);
  return updated;
}
