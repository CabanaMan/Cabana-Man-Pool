# Cabana Man Pool Service

This repository contains the **Cabana Man Pool Service** mobile application. The project uses **React Native with Expo** and TypeScript.

The implementation is progressing screen by screen. The first step adds a Home screen with a simple list of today's jobs and a button to view the route map.

## Folder Structure

- `App.tsx` - Application entry point with React Navigation.
- `app/`
  - `components/` - Reusable UI components (to be implemented).
  - `screens/` - App screens.
    - `HomeScreen.tsx` - Shows today's jobs and total stops.
    - `MapScreen.tsx` - Placeholder for route map.
  - `database/` - Local storage helpers (to be implemented).
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

Next steps will add the Job List, Job Detail, Route Map functionality, chemical calculator, and local storage.
