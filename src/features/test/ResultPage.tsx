import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/auth";
import { getTestResult, getTestByTitle } from './testAPI';
import { useNavigate } from "react-router-dom";

function ResultPage() {
  let navigate = useNavigate();
  let auth = useAuth();


  const [testId, setTestId] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const test = await getTestByTitle(auth.authenticatedUser.token, "Are you an introvert or an extrovert?");
        setTestId(test.id)
        const r = await getTestResult(auth.authenticatedUser.token, testId)
        if (r === "") {
          navigate("/")
        }
        setResult(r)
      }
      catch (error) {
        if (error === "Unauthorized") {
          navigate("/logout");
        }
      }
    })();
  }, [auth.authenticatedUser.token, navigate, testId])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Test is finished. Your result: {result}.
      </Typography>
    </React.Fragment>
  );
}

export default ResultPage;

