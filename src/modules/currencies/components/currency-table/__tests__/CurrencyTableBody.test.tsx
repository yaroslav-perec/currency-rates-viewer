import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from '@mui/material';
import { CurrencyTableBody } from '../CurrencyTableBody';

describe('<CurrencyTableBody />', () => {
  const compared = ['usd', 'eur'];
  const sortedRows = [
    { date: '2025-10-24', usd: 1.23456, eur: 0.98765 },
    { date: '2025-10-23', usd: undefined as unknown as number, eur: NaN },
  ];

  it('renders rates formatted to 4 decimals and fallback symbol for invalid values', () => {
    render(
      <Table>
        <CurrencyTableBody compared={compared} sortedRows={sortedRows} orderBy="usd" />
      </Table>,
    );

    expect(screen.getByText('1.2346')).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(2); // ✅ multiple fallbacks
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
