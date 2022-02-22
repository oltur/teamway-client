import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";

function LogoutPage() {
  //let navigate = useNavigate();
  let auth = useAuth();
  auth.signout(() => {})
  return (
    <div>
      You are logged out. Click <Link to={"/"} >here</Link> to continue
    </div>
  )
}

  
  export default LogoutPage;