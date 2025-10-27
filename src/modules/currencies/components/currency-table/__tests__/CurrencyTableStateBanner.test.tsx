import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CurrencyTableStateBanner } from '../CurrencyTableStateBanner';

describe('<CurrencyTableStateBanner />', () => {
  it('renders nothing when not loading and no error', () => {
    const { container } = render(<CurrencyTableStateBanner loading={false} error={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state with progress bar and text', () => {
    render(<CurrencyTableStateBanner loading={true} error={undefined} />);

    // MUI LinearProgress has role "progressbar"
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/Loading latest exchange rates/i)).toBeInTheDocument();
  });

  it('renders error alert when error provided', () => {
    const error = new Error('Network error');
    render(<CurrencyTableStateBanner loading={false} error={error} />);

    // MUI Alert renders as an element with role="alert"
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Failed to load exchange rates/i)).toBeInTheDocument();
  });

  it('renders only loading if both loading and error true (loading takes priority)', () => {
    const error = new Error('Network error');
    render(<CurrencyTableStateBanner loading={true} error={error} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
