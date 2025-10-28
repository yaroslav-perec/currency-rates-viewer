import { describe, it, expect } from 'vitest';
import reducer, {
  setBase,
  addCompared,
  removeCompared,
  type CurrencyState,
} from '../currenciesSlice';
import { MAX_COMPARED_CURRENCIES } from '../constants';

describe('currenciesSlice', () => {
  const initialState: CurrencyState = {
    base: 'gbp',
    compared: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
  };

  it('should return initial state when passed an empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  describe('setBase', () => {
    it('should update base currency and remove it from compared list', () => {
      const newState = reducer(initialState, setBase('usd'));
      expect(newState.base).toBe('usd');
      expect(newState.compared.includes('usd')).toBe(false);
    });
  });

  describe('addCompared', () => {
    it('should add a new currency if not already in compared list', () => {
      const state: CurrencyState = { ...initialState, compared: ['usd', 'eur'] };
      const newState = reducer(state, addCompared('jpy'));
      expect(newState.compared).toContain('jpy');
    });

    it('should not add a currency if it already exists', () => {
      const state: CurrencyState = { ...initialState, compared: ['usd', 'eur'] };
      const newState = reducer(state, addCompared('usd'));
      expect(newState.compared).toEqual(['usd', 'eur']);
    });

    it('should not add base currency as compared', () => {
      const newState = reducer(initialState, addCompared('gbp'));
      expect(newState.compared).not.toContain('gbp');
    });

    it('should not exceed MAX_COMPARED_CURRENCIES', () => {
      const fullState: CurrencyState = {
        base: 'gbp',
        compared: Array.from({ length: MAX_COMPARED_CURRENCIES }, (_, i) => `c${i}`),
      };
      const newState = reducer(fullState, addCompared('usd'));
      expect(newState.compared.length).toBe(MAX_COMPARED_CURRENCIES);
    });
  });

  describe('removeCompared', () => {
    it('removes a currency when above MIN_COMPARED_CURRENCIES', () => {
      const state: CurrencyState = { base: 'gbp', compared: ['usd', 'eur', 'jpy', 'cad'] }; // 4 > MIN(3)
      const newState = reducer(state, removeCompared('eur'));
      expect(newState.compared).not.toContain('eur');
      expect(newState.compared).toEqual(['usd', 'jpy', 'cad']);
    });

    it('does NOT remove when at or below MIN_COMPARED_CURRENCIES', () => {
      const state: CurrencyState = { base: 'gbp', compared: ['usd', 'eur', 'jpy'] }; // 3 == MIN
      const newState = reducer(state, removeCompared('eur'));
      expect(newState.compared).toEqual(state.compared); // unchanged
    });
  });
});
