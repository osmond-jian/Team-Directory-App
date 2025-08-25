import { getDatabaseFromLocalStorage } from '../../helpers/storageHelper';
import fallbackDatabase from '../../../database/team_database.json';

describe('getDatabaseFromLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns parsed data from localStorage if present', () => {
    const fakeData = [{ email: 'test@example.com', name: 'Test', role: '', picture: '', bio: '' }];
    localStorage.setItem('database', JSON.stringify(fakeData));

    const result = getDatabaseFromLocalStorage();
    expect(result).toEqual(fakeData);
  });

  it('returns fallback data if localStorage is empty', () => {
    const result = getDatabaseFromLocalStorage();
    expect(result).toEqual(fallbackDatabase);
  });

  it('returns fallback data if localStorage data is corrupt', () => {
    localStorage.setItem('database', 'not valid JSON');
    const result = getDatabaseFromLocalStorage();
    expect(result).toEqual(fallbackDatabase);
  });
});
