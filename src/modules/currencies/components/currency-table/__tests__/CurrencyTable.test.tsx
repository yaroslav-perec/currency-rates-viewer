import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrencyTable } from '../CurrencyTable';
import * as hooks from '../../../hooks/useRatesForLast7Days';

vi.mock('../../../hooks/useRatesForLast7Days');

vi.mock('../useTableSort', () => ({
  useTableSort: () => ({
    order: 'asc',
    orderBy: 'usd',
    handleSort: vi.fn(),
    sortedRows: [{ date: '2025-10-15', usd: 1.23, eur: 0.89, jpy: 150 }],
  }),
}));

describe('<CurrencyTable />', () => {
  it('renders rows when data is loaded', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [{ date: '2025-10-15', usd: 1.23, eur: 0.89, jpy: 150 }],
      loading: false,
      error: undefined,
    });

    render(<CurrencyTable selectedDate="2025-10-15" />);

    expect(screen.getByText('1.23')).toBeInTheDocument();
    expect(screen.getByText('0.89')).toBeInTheDocument();
  });

  it('shows banner when loading', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [],
      loading: true,
      error: undefined,
    });

    render(<CurrencyTable selectedDate="2025-10-15" />);

    // CurrencyTableStateBanner should be rendered
    expect(screen.getByTestId('table-state-banner')).toBeInTheDocument();
  });

  it('shows banner when error occurs', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [],
      loading: false,
      error: new Error('Failed to fetch'),
    });

    render(<CurrencyTable selectedDate="2025-10-15" />);

    expect(screen.getByTestId('table-state-banner')).toBeInTheDocument();
  });
});
