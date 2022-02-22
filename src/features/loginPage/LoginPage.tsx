import { TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth";

import * as H from "history";

interface stateType {
    from: { pathname: string }
  }
  
function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
  
    let l = location as H.Location;
    let st = l.state as stateType
    let from = st?.from?.pathname || "/";
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
      let username = formData.get("username") as string;
      let password = formData.get("password") as string;
  
      auth.signin(username, password, () => {
        navigate(from, { replace: true });
      });
    }
  
    return (
      <div className="Login">
        <p>You must log in to view the page at {from}</p>
  
  <form onSubmit={handleSubmit}>
  
    <TextField
      name="username"
      variant="standard"
      placeholder="Username"
      margin="normal"
      required
    />
    <br/>
    <TextField
      name="password"
      variant="standard"
      placeholder="Password"
      margin="normal"
      required
      type="password"
    />
  
    <div className="Button">
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Log In
      </Button>
      </div>
      </form>
      </div>
    );
}

export default LoginPage;