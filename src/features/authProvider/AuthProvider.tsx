import React from "react";
import { authProvider, AuthContext } from "../auth/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);
  
    let signin = (username: string, password: string, callback: VoidFunction) => {
      return authProvider.signin(username, password, () => {
        setUser(username);
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return authProvider.signout(() => {
        setUser(null);
        callback();
      });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export default AuthProvider;