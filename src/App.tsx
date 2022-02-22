import './App.css';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Container from '@mui/material/Container';
import {
  Box,
} from '@mui/material';
import ResponsiveAppBar from './features/responsiveAppBar/ResponsiveAppBar';
import LoginPage from './features/loginPage/LoginPage';
import LogoutPage from './features/logoutPage/LogoutPage';
import TestPage from './features/test/TestPage';
import WelcomePage from './features/welcome/WelcomePage';
import AuthProvider from './features/auth/AuthProvider';
import RequireAuth from './features/auth/RequireAuth';
import Copyright from './features/copyright/Copyright';

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="md">

        <ResponsiveAppBar />

        <Box sx={{ my: 4 }}>

          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route 
              path='/logout'               
              element={<LogoutPage />}
            />
            <Route
              path='/test'
              element={
                <RequireAuth>
                  <TestPage />
                </RequireAuth>
              }
            />
          </Routes>

          <Copyright />
        </Box>
      </Container>
    </AuthProvider>
  );
}

export default App;
