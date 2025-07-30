export interface Job {
  id: string;
  customer: string;
  address: string;
  latitude: number;
  longitude: number;
  completed: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  JobDetail: { jobId: string };
  Calculator: undefined;
};
