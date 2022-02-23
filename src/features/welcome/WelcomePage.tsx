import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Welcome
        </Typography>
        <p>Welcome to your personality test. Click <Link to={`/test`}>here</Link> to start a test</p>
      </React.Fragment>
    );
  }
  
  export default WelcomePage;