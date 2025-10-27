import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ComparedCurrenciesList } from '../ComparedCurrenciesList';

describe('<ComparedCurrenciesList />', () => {
  it('renders heading and counter correctly', () => {
    render(<ComparedCurrenciesList compared={['usd', 'eur']} min={1} max={5} />);

    expect(screen.getByText(/Compared currencies/i)).toBeInTheDocument();
    expect(screen.getByText('2/5')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('renders counter chip in red when count >= max', () => {
    const { getByText } = render(
      <ComparedCurrenciesList compared={['usd', 'eur', 'jpy', 'chf', 'cad']} min={1} max={5} />,
    );

    const counterChip = getByText('5/5');
    expect(counterChip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorError');
  });

  it('calls onDelete when allowed (above min)', () => {
    const mockOnDelete = vi.fn();

    render(
      <ComparedCurrenciesList compared={['usd', 'eur']} min={1} max={5} onDelete={mockOnDelete} />,
    );

    // find delete icon(s)
    const deleteIcons = screen.getAllByTestId('CancelIcon');
    expect(deleteIcons.length).toBeGreaterThan(0);

    fireEvent.click(deleteIcons[0]); // simulate delete click on first chip

    expect(mockOnDelete).toHaveBeenCalledWith('usd');
  });

  it('does NOT call onDelete when at or below min', () => {
    const mockOnDelete = vi.fn();

    render(
      <ComparedCurrenciesList compared={['usd', 'eur']} min={2} max={5} onDelete={mockOnDelete} />,
    );

    const deleteIcons = screen.queryAllByTestId('CancelIcon');
    if (deleteIcons.length > 0) fireEvent.click(deleteIcons[0]);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('does NOT crash if onDelete is undefined', () => {
    render(<ComparedCurrenciesList compared={['usd']} min={1} max={5} />);
    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});
