import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";

function LogoutPage() {
  let auth = useAuth();


  useEffect(() => {
    auth.signout(auth.authenticatedUser.token, null)
  }, [auth.authenticatedUser.token])


    return (
    <div>
      You are logged out. Click <Link to={"/"} >here</Link> to continue
    </div>
  )
}

  
  export default LogoutPage;