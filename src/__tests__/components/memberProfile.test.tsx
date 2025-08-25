import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { TeamMemberProfile } from '../../components/MemberProfile';
import type { databaseObject } from '../../types';

// Create a mock function to use for navigate
const mockNavigate = vi.fn();

// 🔧 Mock useNavigate
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('TeamMemberProfile', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testMember: databaseObject = {
    name: 'Jane Doe',
    role: 'Engineer',
    email: 'jane@example.com',
    picture: 'https://example.com/jane.jpg',
    bio: 'An experienced engineer.',
  };

  it('renders team member details correctly', () => {
    render(<TeamMemberProfile teamMember={testMember} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText(/Engineer/)).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('An experienced engineer.')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', testMember.picture);
  });

  it('shows placeholder if no image is provided', () => {
    const memberWithoutPic = { ...testMember, picture: '' };
    render(<TeamMemberProfile teamMember={memberWithoutPic} />);

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('shows default bio if none provided', () => {
    const memberWithoutBio = { ...testMember, bio: '' };
    render(<TeamMemberProfile teamMember={memberWithoutBio} />);

    expect(screen.getByText('No bio available.')).toBeInTheDocument();
  });

  it('navigates back when button is clicked', () => {
    render(<TeamMemberProfile teamMember={testMember} />);

    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
