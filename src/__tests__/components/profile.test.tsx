import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Profile } from '../../components/profile'; // adjust path if needed
import type { databaseObject } from '../../types';

// 🔧 Mock useParams
vi.mock('react-router', () => ({
  useParams: () => ({ email: 'jane@example.com' }),
}));

// Optional: mock TeamMemberProfile to isolate Profile test
vi.mock('../../components/MemberProfile', () => ({
  TeamMemberProfile: ({ teamMember }: { teamMember: databaseObject }) => (
    <div>Mocked Profile: {teamMember.name}</div>
  ),
}));

describe('Profile component', () => {
  const testMember: databaseObject = {
    name: 'Jane Doe',
    role: 'Engineer',
    email: 'jane@example.com',
    picture: 'https://example.com/jane.jpg',
    bio: 'An experienced engineer.',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders TeamMemberProfile when user is found', () => {
    localStorage.setItem('database', JSON.stringify([testMember]));

    render(<Profile />);

    // Check for mocked profile component
    expect(screen.getByText(/Mocked Profile: Jane Doe/)).toBeInTheDocument();
  });

  it('shows fallback when user is not found', () => {
    localStorage.setItem('database', JSON.stringify([])); // No users

    render(<Profile />);

    expect(screen.getByText(/Team member not found/i)).toBeInTheDocument();
  });
});
