import React from 'react';
import { login, logout} from '../auth/authAPI';

const authProvider = {
  isAuthenticated: false,
  signin(username: string, password: string, callback: VoidFunction) {
    login(username, password)
      .then(token => {
        authProvider.isAuthenticated = true;
        callback();
      })
      .catch(err => alert(err))
  },
  signout(callback: VoidFunction) {
    logout()
      .then(() => {
        authProvider.isAuthenticated = false;
        callback();
      })
      .catch(err => 
        alert(err)
      )
  }
};

interface AuthContextType {
  user: any;
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

export { authProvider, AuthContext, useAuth };
