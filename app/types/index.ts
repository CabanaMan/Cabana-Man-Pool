export interface Job {
  id: string;
  customer: string;
  address: string;
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Map: { jobs: Job[] } | undefined;
  JobDetail: { job: Job };
  ChemCalc: undefined;
};
