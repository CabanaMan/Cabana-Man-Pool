# Cabana Man Pool Service

This mobile app helps pool technicians manage their daily route. It is built with **React Native**, **Expo**, and **TypeScript**.

## Features

- View today's jobs and navigate to the job list or route map
- Manage customers and service history stored locally using SQLite
- Log chemical readings and notes for each job
- Built‑in chemical dosage calculator for chlorine, acid, baking soda, stabilizer, and salt
- Optimized route map with job markers and automatic stop ordering
- Basic settings with dark mode preference

## Folder Structure

- `App.tsx` – Application entry with navigation
- `app/components/` – Reusable UI components
- `app/screens/` – All app screens
- `app/database/` – SQLite helpers
- `app/types/` – Shared TypeScript types

## Running the Project

1. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```
2. Type-check the project
   ```bash
   npm run type-check
   ```
3. Start Expo (offline mode works without network access)
   ```bash
   npm run start-offline
   ```
4. Open the app on a device with the Expo Go app or an emulator.

Feel free to customize each screen to suit your workflow.
