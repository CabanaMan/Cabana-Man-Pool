import * as SQLite from 'expo-sqlite';
import { Job, ServiceLog } from '../types';

const db = SQLite.openDatabase('cabana.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS jobs(
        id TEXT PRIMARY KEY NOT NULL,
        customer TEXT,
        address TEXT,
        notes TEXT,
        poolSize INTEGER,
        services TEXT,
        lastService TEXT,
        completed INTEGER,
        latitude REAL,
        longitude REAL
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS service_logs(
        id TEXT PRIMARY KEY NOT NULL,
        jobId TEXT,
        date TEXT,
        chlorine REAL,
        ph REAL,
        alkalinity REAL,
        chemicalsAdded TEXT
      );`
    );
  });
};

export const getJobs = (): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM jobs',
        [],
        (_, { rows }) => {
          const data = rows._array.map(row => ({
            ...row,
            completed: !!row.completed,
          }));
          resolve(data);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const saveJob = (job: Job) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO jobs (id, customer, address, notes, poolSize, services, lastService, completed, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.id,
        job.customer,
        job.address,
        job.notes,
        job.poolSize,
        job.services,
        job.lastService,
        job.completed ? 1 : 0,
        job.latitude,
        job.longitude,
      ]
    );
  });
};

export const deleteJob = (jobId: string) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM jobs WHERE id = ?', [jobId]);
    tx.executeSql('DELETE FROM service_logs WHERE jobId = ?', [jobId]);
  });
};

export const addServiceLog = (log: ServiceLog) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO service_logs (id, jobId, date, chlorine, ph, alkalinity, chemicalsAdded)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        log.id,
        log.jobId,
        log.date,
        log.chlorine,
        log.ph,
        log.alkalinity,
        log.chemicalsAdded,
      ]
    );
  });
};

export const getServiceLogs = (jobId: string): Promise<ServiceLog[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM service_logs WHERE jobId = ? ORDER BY date DESC',
        [jobId],
        (_, { rows }) => resolve(rows._array as ServiceLog[]),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const seedJobs = () => {
  getJobs().then(existing => {
    if (existing.length === 0) {
      const sample: Job[] = [
        { id: '1', customer: 'Smith Family', address: '123 Palm Rd', notes: '', poolSize: 15000, services: '', lastService: '', completed: false, latitude: 37.78, longitude: -122.43 },
        { id: '2', customer: 'Jones Estate', address: '456 Ocean Ave', notes: '', poolSize: 20000, services: '', lastService: '', completed: false, latitude: 37.79, longitude: -122.42 },
        { id: '3', customer: 'Liu Residence', address: '789 Sunset Blvd', notes: '', poolSize: 18000, services: '', lastService: '', completed: false, latitude: 37.80, longitude: -122.41 },
      ];
      sample.forEach(saveJob);
    }
  });
};
