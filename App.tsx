import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import MapScreen from './app/screens/MapScreen';
import JobDetailScreen from './app/screens/JobDetailScreen';
import ChemicalCalculatorScreen from './app/screens/ChemicalCalculatorScreen';
import { RootStackParamList } from './app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="ChemCalc" component={ChemicalCalculatorScreen} options={{ title: 'Chemical Calculator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
