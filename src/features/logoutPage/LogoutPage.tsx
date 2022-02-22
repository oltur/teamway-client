import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";

function LogoutPage() {
  let auth = useAuth();
  if(!!auth.authenticatedUser?.userId) {
    auth.signout(() => {})
  }
  return (
    <div>
      You are logged out. Click <Link to={"/"} >here</Link> to continue
    </div>
  )
}

  
  export default LogoutPage;