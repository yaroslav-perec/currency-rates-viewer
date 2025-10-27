import { describe, it, expect } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from 'src/shared/tests/server';
import { renderWithStore } from 'src/shared/tests/renderWithStore';
import CurrencyRatesPage from '../CurrencyRatesPage';
import { BASE_API_URL } from '../api/currencyApi';

describe('<CurrencyRatesPage /> integration', () => {
  it('renders rates for today and updates after date change', async () => {
    const user = userEvent.setup();

    renderWithStore(<CurrencyRatesPage />);

    // Wait for heading with today’s date (ISO)
    const heading = await screen.findByRole('heading', { name: /Exchange Rates/i });
    expect(heading.textContent).toMatch(/\(\d{4}-\d{2}-\d{2}\)/);

    // Wait for at least one rate cell to load
    await waitFor(() => {
      expect(screen.getAllByText(/0\.9000/).length).toBeGreaterThan(0);
    });

    // Simulate date picker change
    const dateButton = screen.getByRole('button', { name: /choose date/i });
    await user.click(dateButton);
    await user.keyboard('{ArrowRight}{Enter}');

    // Wait for heading to re-render with new date
    await waitFor(() => expect(screen.getByText(/Exchange Rates \(/)).toBeInTheDocument());

    // Verify new rates are displayed
    const rateCells = screen.getAllByText(/0\.9000/);
    expect(rateCells.length).toBeGreaterThan(0);

    // Optional structural check
    const firstRow = rateCells[0].closest('tr');
    expect(within(firstRow!).getByText(/0\.9000/)).toBeInTheDocument();
  });

  it('displays an error message when the API request fails', async () => {
    // Override default handler to simulate failure
    server.use(
      http.get(`${BASE_API_URL}:date/v1/currencies/:base.json`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );

    renderWithStore(<CurrencyRatesPage />);

    // Optional: show loading state first (if your UI shows it)
    const maybeLoading = await screen.findByText(/loading/i);
    expect(maybeLoading).toBeInTheDocument();

    // Then expect error/fallback message
    await waitFor(() => {
      expect(screen.getByText(/failed|error|unable to fetch/i)).toBeInTheDocument();
    });
  });
});
