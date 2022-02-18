import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography, Link as MuiLink } from '@mui/material';
import { useForm } from "react-hook-form";
import ResponsiveAppBar from './ResponsiveAppBar';

// src/components/Home.tsx
const Welcome = () => {
  return <p>Home</p>;
}
// src/components/Settings.tsx
const Settings = () => {
  return <p>Settings</p>;
}

const handleRadioChange = (event: { target: { value: any; }; }, value: any) => {
  //setRadioState(event.target.value);
  console.log(event.target.value);
  console.log(value);
};

// src/components/Test.tsx
const Test = () => {
  const { handleSubmit, control } = useForm();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormControl
        component="fieldset"
        variant="filled"
      // disabled
      >
        <FormLabel
          component="legend"
          htmlFor="residence-type-radio"
        >
          Residence
        </FormLabel>
        <RadioGroup
          aria-label="residence"
          id="residence-type-radio"
          defaultValue="homeowner"
          name="radio-buttons-group"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="homeowner"
            control={<Radio />}
            label="Homeowner"
          />
          <FormControlLabel
            value="renter"
            control={<Radio />}
            label="Renter"
          />
          <FormControlLabel
            value="nomad"
            control={<Radio />}
            label="Nomad" />
        </RadioGroup>
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Teamway test task by Alexander Turevskiy, Copyright © '}
      <MuiLink color="inherit" href="https://turevskiy.com">
        https://turevskiy.com
      </MuiLink>
      {' '}
      {new Date().getFullYear()}.
      <br/>
      {'Tests are © '}
      <MuiLink color="inherit" href="https://www.psychologies.co.uk">
      https://www.psychologies.co.uk
      </MuiLink>
    </Typography>
  );
}


function App() {
  return (
    <Container maxWidth="md">
     
     <ResponsiveAppBar/>
     
     <Box sx={{ my: 4 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          <img src={logo} className="App-logo" alt="logo" />
        </Typography> */}
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/test' element={<Test />} />
          <Route path='/tests-list' element={<Settings />} />
          <Route path='/counter' element={<Counter />} />
        </Routes>

        <Copyright />
        </Box>
    </Container>
  );
}

export default App;
