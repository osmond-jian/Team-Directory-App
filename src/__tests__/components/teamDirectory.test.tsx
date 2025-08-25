import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { TeamDirectory } from '../../components/TeamDirectory';
import * as api from '../../API/getTeamMembers';

// Mock getTeamMembers API call
vi.mock('../../API/getTeamMembers', () => ({
  getTeamMembers: vi.fn(),
}));

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

// Stub Modal and Button components to avoid full render
vi.mock('../../components/Modal', () => ({
  Modal: ({ modalState }: { modalState: boolean }) =>
    modalState ? <div data-testid="modal">Modal Open</div> : null,
}));
vi.mock('../../components/Button', () => ({
  Button: ({ label, onClick, selected }: { label: string; onClick: () => void; selected: boolean }) => (
    <button
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </button>
  ),
}));

describe('TeamDirectory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and controls', () => {
    render(<TeamDirectory />);

    expect(screen.getByRole('heading', { name: /team directory/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'role' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'email' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Add Member' })).toBeInTheDocument();
  });

  it('toggles filter buttons selection', () => {
    render(<TeamDirectory />);

    const nameBtn = screen.getByRole('button', { name: 'name' });

    // Initially not selected
    expect(nameBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(nameBtn);
    expect(nameBtn).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(nameBtn);
    expect(nameBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('updates search input value', () => {
    render(<TeamDirectory />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Alice' } });
    expect(input).toHaveValue('Alice');
  });

  it('calls getTeamMembers API and updates table on Search click', async () => {
    const mockMembers = [
      { name: 'Alice', role: 'Developer', email: 'alice@example.com', picture: '', bio: '' },
    ];
    (api.getTeamMembers as any).mockResolvedValueOnce(mockMembers);

    render(<TeamDirectory />);

    // type search term
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Alice' } });

    // click Search button
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    // wait for async update
    await waitFor(() => {
      // The SearchResultTable receives the updated teamMembers as prop, so look for their names rendered
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    // Also confirm getTeamMembers called with correct params
    expect(api.getTeamMembers).toHaveBeenCalledWith('Alice', '');
  });

  it('toggles modal on "+ Add Member" click', () => {
    render(<TeamDirectory />);

    const addBtn = screen.getByRole('button', { name: '+ Add Member' });

    // Modal initially closed
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('toggles filter sidebar open/close', () => {
    render(<TeamDirectory />);

    const toggleBtn = screen.getByText(/show filters/i);

    // Initially closed (no 'open' class)
    expect(document.querySelector('.controls')).not.toHaveClass('open');

    fireEvent.click(toggleBtn);
    expect(document.querySelector('.controls')).toHaveClass('open');

    fireEvent.click(toggleBtn);
    expect(document.querySelector('.controls')).not.toHaveClass('open');
  });
});
