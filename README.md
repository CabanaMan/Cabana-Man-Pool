# Cabana Man Pool Service

This repository contains the **Cabana Man Pool Service** mobile application. The project uses **React Native with Expo** and TypeScript.

The application provides a home screen listing today's jobs with options to view each job, see a route map with stops, and run a basic chemical calculator.

## Folder Structure

- `App.tsx` - Application entry point with React Navigation.
- `app/`
  - `components/` - Reusable UI components.
    - `JobItem.tsx` - List item for a job.
  - `screens/` - App screens.
    - `HomeScreen.tsx` - Shows today's jobs and total stops.
    - `MapScreen.tsx` - Displays the route map for today's jobs.
    - `JobDetailScreen.tsx` - Displays details about a job.
    - `ChemicalCalculatorScreen.tsx` - Simple pool chemical calculator.
  - `database/` - Local storage helpers.
  - `types/` - Shared TypeScript types.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm start
   ```
3. Use the Expo Go app or an emulator to run the project.

This example includes a simple job list with detail screens, a route map and chemical calculator. Job data is stored locally using AsyncStorage.
