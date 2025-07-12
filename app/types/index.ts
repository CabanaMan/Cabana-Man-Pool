export interface Job {
  id: string;
  customer: string;
  address: string;
  notes: string;
  poolSize: number;
  services: string; // comma separated services
  lastService: string; // ISO date string
  completed: boolean;
  latitude: number;
  longitude: number;
}

export interface ServiceLog {
  id: string;
  jobId: string;
  date: string;
  chlorine: number;
  ph: number;
  alkalinity: number;
  chemicalsAdded: string;
}

export type RootStackParamList = {
  Home: undefined;
  Jobs: undefined;
  JobDetail: { jobId: string };
  Map: undefined;
  Calculator: undefined;
  Settings: undefined;
  AddJob: { jobId?: string };
};
