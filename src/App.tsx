import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography, Link as MuiLink } from '@mui/material';
import { useForm } from "react-hook-form";
import ResponsiveAppBar from './features/responsiveAppBar/ResponsiveAppBar';
import { fakeAuthProvider, AuthContext, useAuth } from "./auth";
import * as H from "history";

// src/components/Home.tsx
const Welcome = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Welcome
      </Typography>
      <p>Welcome to your personality test. Click <Link to={`/test`}>here</Link> to start a new one</p>
    </React.Fragment>
  );
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
  const { control } = useForm();
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
      <br />
      {'Tests are © '}
      <MuiLink color="inherit" href="https://www.psychologies.co.uk">
        https://www.psychologies.co.uk
      </MuiLink>
    </Typography>
  );
}

interface stateType {
  from: { pathname: string }
}

function LogoutPage() {
  let navigate = useNavigate();
  let auth = useAuth();
  auth.signout(() => {
    navigate("/");
  })
  return (
    <div></div>
  )
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let l = location as H.Location;
  let st = l.state as stateType
  let from = st?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.signin(username, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// interface AuthContextType {
//   user: any;
//   signin: (username: string, password: string, callback: VoidFunction) => void;
//   signout: (callback: VoidFunction) => void;
// }

// let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (username: string, password: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(username, password, () => {
      setUser(username);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// function useAuth() {
//   return React.useContext(AuthContext);
// }

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="md">

        <ResponsiveAppBar />

        <Box sx={{ my: 4 }}>
          {/* <Typography variant="h4" component="h1" gutterBottom>
          <img src={logo} className="App-logo" alt="logo" />
        </Typography> */}
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route
              path='/test'
              element={
                <RequireAuth>
                  <Test />
                </RequireAuth>
              }
            />
            {/* <Route path='/tests-list' element={<Settings />} /> */}
            <Route path='/counter' element={<Counter />} />
          </Routes>

          <Copyright />
        </Box>
      </Container>
    </AuthProvider>
  );
}

export default App;
