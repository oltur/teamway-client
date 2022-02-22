import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { authProvider, AuthContext } from "./auth";
import AuthenticatedUser from "./AuthenticatedUser";
import {
  set,
  selectAuthenticatedUser,
} from './authSlice';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  //    let [authenticatedUser, setAuthenticatedUser] = React.useState<AuthenticatedUser|null>(null);
  
    let signin = (username: string, password: string, callback: VoidFunction) => {
      return authProvider.signin(username, password, (authenticatedUser) => {
        dispatch(set(authenticatedUser));
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return authProvider.signout(() => {
        dispatch(set(new AuthenticatedUser()));
        callback();
      });
    };
  
    let value = { authenticatedUser, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export default AuthProvider;