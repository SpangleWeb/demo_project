import { useState } from 'react';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useFetchAllData } from './hooks/api/useFetchAllData';
import { ScatterChart } from './components/ScatterPlot/ScatterPlot';
import { SelectChangeEvent } from '@mui/material';
import { SelectInput } from './components/SelectInput/SelectInput';

type SelectOption = {
  label: string;
  value: string;
}

/**
 * 
 * I love using mui for react apps. They make development rapid.
 */

const App = () => {
  const [selectedValueOptionOne, setSelectedValueOptionOne] = useState<string>('HSCW');
  const [selectedValueOptionTwo, setSelectedValueOptionTwo] = useState<string>('IMF');

  /**
   * I like to make hooks to fetch data, which we can then return data, loading and error
   * This makes it easy to do what I have done below, where based on the state of this request
   * we can return one thing or another
   */
  const { data, loading, error } = useFetchAllData();

  // This could have been a useCallback, just opted to use this regular function
  // instead of a callback as what we are doing in the functions is not too expensive.
  const handleChangeOptionOne = (event: SelectChangeEvent<string>) => {
    setSelectedValueOptionOne(event.target.value);
    // Reset selected value of option two if it matches the new option one
    if (event.target.value === selectedValueOptionTwo) {
      // Or set to a default value (should not happen, but better safe)
      setSelectedValueOptionTwo('');
    }
  };

  const handleChangeOptionTwo = (event: SelectChangeEvent<string>) => {
    setSelectedValueOptionTwo(event.target.value);
  };


  // Return early for loading and error states
  if (loading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Card>
          <Typography variant="h5">Loading...</Typography>
        </Card>
      </Stack>
    );
  }

  // Return early if there is an error
  if (error) {
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Card>
          <Typography variant="h5">Error loading the data</Typography>
        </Card>
      </Stack>
    );
  }

  const options: SelectOption[] = [
    { label: 'HSCW', value: 'HSCW' },
    { label: 'IMF', value: 'IMF' },
    { label: 'LMY', value: 'LMY' },
    { label: 'GLQ', value: 'GLQ' },
  ];

  // Filter options for both selects as we do not want to compare the same dataset to itself
  const filteredOptionsForFirstSelect = options.filter(option => option.value !== selectedValueOptionTwo);
  const filteredOptionsForSecondSelect = options.filter(option => option.value !== selectedValueOptionOne);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Card>
        <Stack justifyContent="center" alignItems="center" p={6}>
          <Stack justifyContent="center" alignItems="center" flexDirection="row" width="100%" mb="24px">
            <Box width="30%" mr="24px">
              <SelectInput 
                value={selectedValueOptionOne} 
                onChange={handleChangeOptionOne} 
                options={filteredOptionsForFirstSelect} 
                selectId="select-1"
                label="X Axis"
              />
            </Box>
            <Box width="30%" ml="24px">
              <SelectInput 
                value={selectedValueOptionTwo} 
                onChange={handleChangeOptionTwo} 
                options={filteredOptionsForSecondSelect} 
                selectId="select-2" 
                label="Y Axis"
              />
            </Box>
          </Stack>
          <ScatterChart allData={data} xAxisField={selectedValueOptionOne} yAxisField={selectedValueOptionTwo} />
        </Stack>
      </Card>
    </Stack>
  );
};

export default App;
