import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';

const JOBS_KEY = 'jobs';

export async function loadJobs(): Promise<Job[]> {
  const json = await AsyncStorage.getItem(JOBS_KEY);
  if (json) {
    try {
      return JSON.parse(json) as Job[];
    } catch {
      return [];
    }
  }
  return [];
}

export async function saveJobs(jobs: Job[]): Promise<void> {
  await AsyncStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}
