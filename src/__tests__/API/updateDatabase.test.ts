// updateTeamMember.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { editTeamMembers, addTeamMember, deleteTeamMember } from '../../API/updateLocalStorageDatabase';
import type { databaseObject } from '../../types';

describe('editTeamMember', () => {
  const original: databaseObject = {
    name: 'Jane Doe',
    role: 'Engineer',
    email: 'jane@example.com',
    picture: '',
    bio: '',
  };

  const updated: databaseObject = {
    name: 'Jane Updated',
    role: 'Senior Engineer',
    email: 'jane@example.com',
    picture: '',
    bio: 'Updated bio',
  };

  const otherMember: databaseObject = {
    name: 'John Smith',
    role: 'Manager',
    email: 'john@example.com',
    picture: '',
    bio: '',
  };

  beforeEach(() => {
    localStorage.clear();

    // Set initial data in localStorage
    const database = [original, otherMember];
    localStorage.setItem('database', JSON.stringify(database));
  });

  it('replaces the correct team member in localStorage', async () => {
    await editTeamMembers(original, updated);

    const result = await JSON.parse(localStorage.getItem('database') || '[]');

    expect(result).toHaveLength(2);

    const updatedMember = result.find((m: databaseObject) => m.email === updated.email);
    const untouchedMember = result.find((m: databaseObject) => m.email === otherMember.email);

    expect(updatedMember).toEqual(updated);
    expect(untouchedMember).toEqual(otherMember);
  });
    it('deletes the correct team member in localStorage', async () => {
    await deleteTeamMember(original);

    const result = await JSON.parse(localStorage.getItem('database') || '[]');

    expect(result).toHaveLength(1);

  });
    it('adds the correct team member in localStorage', async () => {
    await addTeamMember(original);

    const result = await JSON.parse(localStorage.getItem('database') || '[]');

    expect(result).toHaveLength(2);
  });
});
