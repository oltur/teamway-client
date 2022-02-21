import React from 'react';

/**
 * This represents some generic auth provider API, like Firebase.
 */
 const fakeAuthProvider = {
    isAuthenticated: false,
    signin(username: string, password: string, callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
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
  
  export { fakeAuthProvider, AuthContext, useAuth };
      