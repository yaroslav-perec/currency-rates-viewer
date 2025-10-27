import { useState } from 'react';
import { Stack, Typography, Autocomplete, TextField } from '@mui/material';
import { useAppDispatch } from 'src/redux/hooks';
import { addCompared, removeCompared } from '../../currenciesSlice';
import { MAX_COMPARED_CURRENCIES, MIN_COMPARED_CURRENCIES } from '../../constants';
import { useComparedCurrencies } from './useComparedCurrencies';
import { ComparedCurrenciesList } from './ComparedCurrenciesList';

export function ComparedCurrenciesManager() {
  const dispatch = useAppDispatch();
  const { compared, available } = useComparedCurrencies();
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleAddCurrency = (_: unknown, newValue: string | null) => {
    if (newValue) {
      dispatch(addCompared(newValue.toLowerCase()));
      setValue(null);
      setInputValue('');
    }
  };

  const handleInputChange = (_: unknown, newInput: string) => {
    setInputValue(newInput);
  };

  const handleDelete = (code: string) => {
    dispatch(removeCompared(code));
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        Add currency
      </Typography>

      <Autocomplete
        size="small"
        options={available}
        value={value}
        inputValue={inputValue}
        onChange={handleAddCurrency}
        onInputChange={handleInputChange}
        disabled={compared.length >= MAX_COMPARED_CURRENCIES}
        blurOnSelect
        clearOnEscape
        renderInput={(params) => <TextField {...params} placeholder="Search..." />}
      />

      <ComparedCurrenciesList
        compared={compared}
        min={MIN_COMPARED_CURRENCIES}
        max={MAX_COMPARED_CURRENCIES}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
