import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as dateUtils from 'src/shared/utils/date';
import { DateSelector } from '../DateSelector';

// --- Mock shared date utils ---
vi.mock('src/shared/utils/date', () => ({
  clampToPast90Days: vi.fn((iso) => iso),
  DAYS_BACK_LIMIT: 90,
  latestAvailableApiDate: vi.fn(() => '2025-10-25'),
}));

function renderWithLocalization(ui: React.ReactNode) {
  return render(<LocalizationProvider dateAdapter={AdapterDateFns}>{ui}</LocalizationProvider>);
}

describe('<DateSelector />', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders caption correctly and shows tooltip on hover', async () => {
    const user = userEvent.setup();
    renderWithLocalization(<DateSelector value="2025-10-20" onChange={mockOnChange} />);

    // Caption should always be visible
    expect(screen.getByText(/Latest available rates date:/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-10-25/)).toBeInTheDocument();

    // Tooltip should appear on hover
    const input = screen.getAllByRole('spinbutton')[0];
    await user.hover(input);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent(/You can select any date within the last 90 days/i);
  });

  it('calls onChange when a valid date is selected', async () => {
    const user = userEvent.setup();
    renderWithLocalization(<DateSelector value="2025-10-20" onChange={mockOnChange} />);

    const input = screen.getAllByRole('spinbutton')[0];
    await user.clear(input);
    await user.type(input, '24');
    fireEvent.blur(input);

    expect(dateUtils.clampToPast90Days).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('handles invalid input gracefully (no valid ISO emitted)', async () => {
    const user = userEvent.setup();
    renderWithLocalization(<DateSelector value="2025-10-20" onChange={mockOnChange} />);

    const input = screen.getAllByRole('spinbutton')[0];
    await user.clear(input);
    await user.type(input, 'abc');
    fireEvent.blur(input);

    // Clamp may still be called, but no valid ISO should escape
    const calls = mockOnChange.mock.calls.flat();

    expect(calls.length).toBe(0);
  });
});
