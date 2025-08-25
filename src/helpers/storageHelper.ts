import type { databaseObject } from '../types';
import fallbackDatabase from '../../database/team_database.json';

export function getDatabaseFromLocalStorage(): databaseObject[] {
  const rawData = localStorage.getItem('database');
  if (rawData) {
    try {
      return JSON.parse(rawData);
    } catch {
      // Optionally log or handle corrupt localStorage data
      return fallbackDatabase;
    }
  }
  return fallbackDatabase;
}
