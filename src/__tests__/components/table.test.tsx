import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchResultTable } from '../../components/Table';
import * as updateDB from '../../API/updateLocalStorageDatabase';
import type { databaseObject } from '../../types';

// 🧪 Mocks
vi.mock('react-router', () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

// Stub modal to simplify DOM instead of importing the entire modal component
vi.mock('../../components/Modal', () => ({
  Modal: ({ modalState }: { modalState: boolean }) =>
    modalState ? <div data-testid="modal">Modal Open</div> : null,
}));

// Spy delete function
vi.mock('../../API/updateLocalStorageDatabase', () => ({
  deleteTeamMember: vi.fn(),
}));

describe('SearchResultTable', () => {
  const mockRefresh = vi.fn();

  const generateMembers = (count: number): databaseObject[] =>
    Array.from({ length: count }, (_, i) => ({
      name: `Member ${i + 1}`,
      role: `Role ${i + 1}`,
      email: `member${i + 1}@example.com`,
      picture: '',
      bio: '',
    }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    render(<SearchResultTable teamMembers={[]} loading={true} handleSearchRefresh={mockRefresh} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders table with team members', () => {
    const members = generateMembers(2);
    render(<SearchResultTable teamMembers={members} loading={false} handleSearchRefresh={mockRefresh} />);

    expect(screen.getByText('Member 1')).toBeInTheDocument();
    expect(screen.getByText('Member 2')).toBeInTheDocument();
    //it was finding the table headers too, so look for buttons only
    const editButtons = screen.getAllByText('Edit').filter(el => el.tagName === 'BUTTON');
    expect(editButtons).toHaveLength(2);
    const deleteButtons = screen.getAllByText('Delete').filter(el => el.tagName === 'BUTTON');
    expect(deleteButtons).toHaveLength(2);
  });

  it('opens modal when Edit is clicked', () => {
    const members = generateMembers(1);
    render(<SearchResultTable teamMembers={members} loading={false} handleSearchRefresh={mockRefresh} />);

    const editButtons = screen.getAllByText('Edit').filter(el => el.tagName === 'BUTTON');
    fireEvent.click(editButtons[0]);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls deleteTeamMember and refresh when Delete is clicked', () => {
    const members = generateMembers(1);
    render(<SearchResultTable teamMembers={members} loading={false} handleSearchRefresh={mockRefresh} />);

    fireEvent.click(screen.getAllByText('Delete').filter(el => el.tagName === 'BUTTON')[0]);

    expect(updateDB.deleteTeamMember).toHaveBeenCalledWith(members[0]);
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('renders no results message if no members', () => {
    render(<SearchResultTable teamMembers={[]} loading={false} handleSearchRefresh={mockRefresh} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders pagination if >10 results and handles page changes', () => {
    const members = generateMembers(15); // triggers pagination
    render(<SearchResultTable teamMembers={members} loading={false} handleSearchRefresh={mockRefresh} />);

    // Page 1 visible
    expect(screen.getByText('Member 1')).toBeInTheDocument();
    expect(screen.queryByText('Member 11')).not.toBeInTheDocument();

    // Move to page 2
    fireEvent.click(screen.getByText('2'));

    expect(screen.getByText('Member 11')).toBeInTheDocument();
    expect(screen.queryByText('Member 1')).not.toBeInTheDocument();
  });

  it('renders correct See More link', () => {
    const members = generateMembers(1);
    render(<SearchResultTable teamMembers={members} loading={false} handleSearchRefresh={mockRefresh} />);

    const link = screen.getByRole('link', { name: /see more/i });
    expect(link).toHaveAttribute('href', `/profile/${members[0].email}`);
  });
});
