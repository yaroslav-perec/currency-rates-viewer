import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from '@mui/material';
import { CurrencyTableBody } from '../CurrencyTableBody';
import type { TableRateRow } from '../types';

describe('<CurrencyTableBody />', () => {
  const compared = ['usd', 'eur'];
  const sortedRows: TableRateRow[] = [
    { date: '2025-10-24', rates: { usd: 1.23456, eur: 0.98765 } },
    { date: '2025-10-23', rates: { usd: undefined as unknown as number, eur: NaN } },
  ];

  it('renders rates formatted to 4 decimals and fallback symbol for invalid values', () => {
    render(
      <Table>
        <CurrencyTableBody compared={compared} sortedRows={sortedRows} orderBy="usd" />
      </Table>,
    );

    // formats correctly
    expect(screen.getByText('1.2346')).toBeInTheDocument();

    // fallback symbol “—” for undefined or NaN
    const fallbacks = screen.getAllByText('—');
    expect(fallbacks.length).toBe(2);
  });

  it('renders bold style for active sorted column', () => {
    const { getByText } = render(
      <Table>
        <CurrencyTableBody compared={compared} sortedRows={sortedRows} orderBy="usd" />
      </Table>,
    );

    const usdCell = getByText('1.2346').closest('td');
    expect(usdCell).toHaveStyle({ fontWeight: 600 });
  });
});
