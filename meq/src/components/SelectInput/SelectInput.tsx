import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type SelectInputProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Array<{ label: string; value: string }>;
  selectId: string;
  label: string;
};

/**
 * 
 * Created a pretty simple select component
 * This was going to be used a couple times, so split it out.
 */
export const SelectInput: FC<SelectInputProps> = ({ value, onChange, options, selectId, label }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={selectId}>{label}</InputLabel>
      <Select
        labelId={selectId}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
