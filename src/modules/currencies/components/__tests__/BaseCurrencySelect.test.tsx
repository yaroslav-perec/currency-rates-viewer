import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseCurrencySelect } from '../BaseCurrencySelect';
import * as reduxHooks from 'src/redux/hooks';
import * as currencyHooks from '../../hooks/useCurrencyCodes';
import { setBase } from '../../currenciesSlice';

vi.mock('src/redux/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../hooks/useCurrencyCodes', () => ({
  useCurrencyCodes: vi.fn(),
}));

vi.mock('../../currenciesSlice', () => ({
  setBase: vi.fn(),
}));

describe('<BaseCurrencySelect />', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (reduxHooks.useAppDispatch as Mock).mockReturnValue(mockDispatch);
    (reduxHooks.useAppSelector as Mock).mockReturnValue('usd');
  });

  it('renders loading state correctly', () => {
    (currencyHooks.useCurrencyCodes as Mock).mockReturnValue({
      codes: [],
      isLoading: true,
    });

    render(<BaseCurrencySelect />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('renders options from useCurrencyCodes', () => {
    (currencyHooks.useCurrencyCodes as Mock).mockReturnValue({
      codes: ['USD', 'EUR', 'GBP'],
      isLoading: false,
    });

    render(<BaseCurrencySelect />);

    // should render input field
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();

    // base selected = USD → uppercase match
    expect(input).toHaveValue('USD');
  });

  it('dispatches setBase when user selects new value', async () => {
    (currencyHooks.useCurrencyCodes as Mock).mockReturnValue({
      codes: ['USD', 'EUR', 'GBP'],
      isLoading: false,
    });

    render(<BaseCurrencySelect />);
    const input = screen.getByRole('combobox');

    // open dropdown
    await userEvent.click(input);

    // select EUR from options
    const option = await screen.findByText('EUR');
    await userEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(setBase).toHaveBeenCalledWith('eur');
  });

  it('does not dispatch if same currency selected', () => {
    (currencyHooks.useCurrencyCodes as Mock).mockReturnValue({
      codes: ['USD', 'EUR'],
      isLoading: false,
    });
    (reduxHooks.useAppSelector as Mock).mockReturnValue('eur'); // already selected

    render(<BaseCurrencySelect />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'EUR' } });
    fireEvent.blur(input);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
