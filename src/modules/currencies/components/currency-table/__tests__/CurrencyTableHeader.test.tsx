import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '@mui/material';
import { describe, it, expect, vi } from 'vitest';
import type { SortOrder } from 'src/shared/types/sort';
import { CurrencyTableHeader } from '../CurrencyTableHeader';

describe('<CurrencyTableHeader />', () => {
  const mockOnSort = vi.fn();
  const baseProps = {
    compared: ['usd', 'eur', 'jpy'],
    order: 'asc' as SortOrder,
    orderBy: 'date',
    onSort: mockOnSort,
  };

  it('renders Date column and compared currency columns', () => {
    render(
      <Table>
        <CurrencyTableHeader {...baseProps} />
      </Table>,
    );

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
  });

  it('calls onSort with correct key when header clicked', () => {
    render(
      <Table>
        <CurrencyTableHeader {...baseProps} />
      </Table>,
    );

    fireEvent.click(screen.getByText('Date'));
    expect(mockOnSort).toHaveBeenCalledWith('date');

    fireEvent.click(screen.getByText('USD'));
    expect(mockOnSort).toHaveBeenCalledWith('usd');
  });

  it('respects current order direction when non-date column is active', () => {
    render(
      <Table>
        <CurrencyTableHeader {...baseProps} order="desc" orderBy="usd" />
      </Table>,
    );

    // Look for the table cell (<th>) that contains "USD"
    const usdCell = screen.getByText('USD').closest('th');

    // Defensive check — ensure it’s actually found
    expect(usdCell).not.toBeNull();

    // Now assert that MUI set aria-sort on <th>
    expect(usdCell).toHaveAttribute('aria-sort', 'descending');
  });
});
