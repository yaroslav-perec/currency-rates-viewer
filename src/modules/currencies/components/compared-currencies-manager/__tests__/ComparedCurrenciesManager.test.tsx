import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ComparedCurrenciesManager } from '../ComparedCurrenciesManager';
import * as reduxHooks from 'src/redux/hooks';
import * as slice from '../../../currenciesSlice';
import * as comparedHook from '../useComparedCurrencies';
import { MAX_COMPARED_CURRENCIES } from '../../../constants';

const mockDispatch = vi.fn();

vi.mock('src/redux/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../useComparedCurrencies', () => ({
  useComparedCurrencies: vi.fn(),
}));

vi.mock('../ComparedCurrenciesList', () => ({
  ComparedCurrenciesList: ({
    compared,
    onDelete,
  }: {
    compared: string[];
    onDelete: (code: string) => void;
  }) => (
    <div>
      {compared.map((c) => (
        <button key={c} onClick={() => onDelete(c)}>
          {c}
        </button>
      ))}
    </div>
  ),
}));

describe('<ComparedCurrenciesManager />', () => {
  const useAppDispatchMock = reduxHooks.useAppDispatch as Mock;
  const useComparedCurrenciesMock = comparedHook.useComparedCurrencies as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    useAppDispatchMock.mockReturnValue(mockDispatch);
  });

  it('renders correctly with title and compared list', () => {
    useComparedCurrenciesMock.mockReturnValue({
      compared: ['usd', 'eur'],
      available: ['JPY', 'CAD'],
    });

    render(<ComparedCurrenciesManager />);
    expect(screen.getByText(/Add currency/i)).toBeInTheDocument();
    expect(screen.getByText('usd')).toBeInTheDocument();
    expect(screen.getByText('eur')).toBeInTheDocument();
  });

  it('dispatches addCompared when selecting a new currency', async () => {
    useComparedCurrenciesMock.mockReturnValue({
      compared: ['usd'],
      available: ['EUR', 'JPY'],
    });

    const addComparedSpy = vi.spyOn(slice, 'addCompared');
    render(<ComparedCurrenciesManager />);

    const input = screen.getByRole('combobox');
    const user = userEvent.setup();

    // Open dropdown
    await user.click(input);

    // Simulate actual option selection
    const option = await screen.findByText('EUR');
    await user.click(option);

    expect(addComparedSpy).toHaveBeenCalledWith('eur');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches removeCompared when clicking delete button', () => {
    useComparedCurrenciesMock.mockReturnValue({
      compared: ['usd', 'eur'],
      available: ['JPY'],
    });

    const removeComparedSpy = vi.spyOn(slice, 'removeCompared');
    render(<ComparedCurrenciesManager />);

    fireEvent.click(screen.getByText('eur'));

    expect(removeComparedSpy).toHaveBeenCalledWith('eur');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('disables autocomplete when compared count >= MAX', () => {
    useComparedCurrenciesMock.mockReturnValue({
      compared: Array.from({ length: MAX_COMPARED_CURRENCIES }, (_, i) => `C${i}`),
      available: ['USD'],
    });

    render(<ComparedCurrenciesManager />);
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();
  });
});
