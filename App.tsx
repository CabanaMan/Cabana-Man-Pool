import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import MapScreen from './app/screens/MapScreen';
import JobListScreen from './app/screens/JobListScreen';
import JobDetailScreen from './app/screens/JobDetailScreen';
import CalculatorScreen from './app/screens/CalculatorScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import AddJobScreen from './app/screens/AddJobScreen';
import { RootStackParamList } from './app/types';
import { initDatabase, seedJobs } from './app/database/database';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase();
    seedJobs();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Jobs" component={JobListScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="AddJob" component={AddJobScreen} options={{ title: 'Add Job' }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
