import React from 'react';
import { login, logout} from './authAPI';
import AuthenticatedUser from "./AuthenticatedUser";

const authProvider = {
  signin(username: string, password: string, callback: ((u: AuthenticatedUser) => void) | null = null) {
    login(username, password)
      .then(authenticatedUser => {
        if(!!callback) {
          callback(authenticatedUser);
        }
      })
      .catch(err => alert(err))
  },
  signout(token: string, callback: VoidFunction | null = null) {
    logout(token)
      .then(() => {
        if(!!callback) {
          callback();
        }
      })
      .catch(err => {}
      )
  }
};

interface AuthContextType {
  authenticatedUser: AuthenticatedUser;
  signin: (username: string, password: string, callback: ((u: AuthenticatedUser) => void) | null) => void;
  signout: (token: string, callback: VoidFunction | null) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

export { authProvider, AuthContext, useAuth };
