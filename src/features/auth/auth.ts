import React from 'react';
import { login, logout} from '../auth/authAPI';
import AuthenticatedUser from "./AuthenticatedUser";

const authProvider = {
  signin(username: string, password: string, callback: (u: AuthenticatedUser) => void) {
    login(username, password)
      .then(authenticatedUser => {
        callback(authenticatedUser);
      })
      .catch(err => alert(err))
  },
  signout(callback: VoidFunction) {
    logout()
      .then(() => {
        callback();
      })
      .catch(err => {}
      )
  }
};

interface AuthContextType {
  authenticatedUser: AuthenticatedUser;
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

export { authProvider, AuthContext, useAuth };
