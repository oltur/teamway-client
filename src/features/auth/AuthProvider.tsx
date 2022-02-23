import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { authProvider, AuthContext } from "./auth";
import AuthenticatedUser from "./AuthenticatedUser";
import {
  set,
  selectAuthenticatedUser,
} from './authSlice';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const authenticatedUserString = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  
    let signin = (username: string, password: string, callback: ((u: AuthenticatedUser) => void) | null = null) => {
      return authProvider.signin(username, password, (authenticatedUser) => {
        dispatch(set(JSON.stringify(authenticatedUser)));
        if(!!callback) {
          callback(authenticatedUser);
        }
      });
    };
  
    let signout = (token: string, callback: VoidFunction | null = null) => {
      dispatch(set(""));
      return authProvider.signout(token, () => {
        if(!!callback) {
          callback();
        }
      });
    };
  
    var authenticatedUser: AuthenticatedUser
    if(!!authenticatedUserString) {
      authenticatedUser = JSON.parse(authenticatedUserString) as AuthenticatedUser
    } else {
      authenticatedUser = new AuthenticatedUser();
    }
    let value = { authenticatedUser, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export default AuthProvider;