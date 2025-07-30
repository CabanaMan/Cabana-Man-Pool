# Cabana Man Pool Service

This repository contains the **Cabana Man Pool Service** mobile application. The project is built with **React Native**, **Expo**, and TypeScript. It allows pool service technicians to view their daily jobs, see them on a map, check details, and calculate chemical adjustments.

## Folder Structure

- `App.tsx` - Application entry point with React Navigation.
- `app/`
  - `components/` - Reusable UI components.
  - `screens/` - App screens.
    - `HomeScreen.tsx` - Displays today's job list with navigation to details, map, and calculator.
    - `JobDetailScreen.tsx` - Shows job information and lets the user mark it complete.
    - `MapScreen.tsx` - Displays job locations using `react-native-maps`.
    - `ChemicalCalculatorScreen.tsx` - Simple chlorine calculator.
  - `database/` - Local storage helpers using AsyncStorage.
  - `types/` - Shared TypeScript types.

## Getting Started

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the Expo development server:
   ```bash
   npm start
   ```
3. Use the Expo Go app or an emulator to run the project.
4. Type-check the project (optional):
   ```bash
   npx tsc
   ```

The initial version now includes the job list, job detail, route map and a simple chemical calculator with data persisted in local storage.

