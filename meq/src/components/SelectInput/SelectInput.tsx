import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type SelectInputProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Array<{ label: string; value: string }>;
  selectId: string;
};

export const SelectInput: FC<SelectInputProps> = ({ value, onChange, options, selectId }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={selectId}>Select Option</InputLabel>
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
