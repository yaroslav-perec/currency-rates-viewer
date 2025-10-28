import { describe, it, vi, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithStore } from 'src/shared/tests/renderWithStore';
import * as hooks from '../../../hooks/useRatesForLast7Days';
import { CurrencyTable } from '../CurrencyTable';

vi.mock('../../../hooks/useRatesForLast7Days');
vi.mock('../useTableSort', () => ({
  useTableSort: () => ({
    order: 'asc',
    orderBy: 'usd',
    handleSort: vi.fn(),
    sortedRows: [{ date: '2025-10-15', rates: { usd: 1.23, eur: 0.89, jpy: 150 } }],
  }),
}));

describe('<CurrencyTable />', () => {
  it('renders table rows with formatted rates', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [{ date: '2025-10-15', rates: { usd: 1.23, eur: 0.89, jpy: 150 } }],
      loading: false,
      error: undefined,
    });

    renderWithStore(<CurrencyTable selectedDate="2025-10-15" />);

    expect(screen.getByText('1.2300')).toBeInTheDocument();
    expect(screen.getByText('0.8900')).toBeInTheDocument();
    expect(screen.getByText('150.0000')).toBeInTheDocument();
  });

  it('shows a loading state', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [],
      loading: true,
      error: undefined,
    });

    renderWithStore(<CurrencyTable selectedDate="2025-10-15" />);

    // match text instead of relying on testid
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows an error message when API fails', () => {
    vi.mocked(hooks.useRatesForLast7Days).mockReturnValue({
      data: [],
      loading: false,
      error: { status: 500, data: 'Failed to fetch' },
    });

    renderWithStore(<CurrencyTable selectedDate="2025-10-15" />);

    // match text for "error" or "failed"
    expect(screen.getByText(/failed|error|unable to fetch/i)).toBeInTheDocument();
  });
});
