import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface ISELECT { 
    currentValue: string, 
    setCurrentValue: (stage: string) => void,
    options: string[][] 
  }
export default function CustomSelect({ currentValue, setCurrentValue, options }: ISELECT) {
  const handleChange = (event: SelectChangeEvent) => {
    setCurrentValue(event.target.value as string);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-label">Stage</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={currentValue}
        onChange={handleChange}
        label="Stage"
      >
        <MenuItem value={currentValue}>{currentValue}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option[0]} value={option[0]}>
            {option[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
