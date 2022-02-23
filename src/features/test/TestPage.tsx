import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/auth";
import { getNextQuestion, answerQuestion, getTestByTitle } from './testAPI';
import { useNavigate } from "react-router-dom";
import { Question, Answer } from "./Test";

function TestPage() {
  let navigate = useNavigate();
  let auth = useAuth();

  const { handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (answer === "") {
      alert("Please choose an answer");
      return
    }
    console.log(testId, question.title, answer);
    answerQuestion(auth.authenticatedUser.token, testId, question.title, answer)
      .then(() => window.location.reload())
      .catch((error) => {
        if (error === "Unauthorized") {
          navigate("/logout");
        }
      });
  }

  const handleRadioChange = (event: { target: { value: any; }; }, value: any) => {
    setAnswer(value);
  };

  const [testId, setTestId] = useState("");
  const [getNextQuestionResult, setGetNextQuestionResult] = useState({ testFinished: false, question: "", totalQuestions: 0, questionNumber: 0 });
  const [question, setQuestion] = useState({ title: "", answers: [{ title: "" }] });
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const testTitle: string = process.env.REACT_APP_TEST_TITLE!;
        const test = await getTestByTitle(auth.authenticatedUser.token, testTitle);
        setTestId(test.id)
        const r = await getNextQuestion(auth.authenticatedUser.token, test.id);
        if (r.testFinished) {
          navigate("/result")
        }
        setGetNextQuestionResult(r)
        const question = test.questions.find((q: Question) => q.title === r.question);
        setQuestion(question!);
      }
      catch (error) {
        if (error === "Unauthorized") {
          navigate("/logout");
        }
      }
    })();
  }, [auth.authenticatedUser.token, navigate])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          {question.title}
        </Typography>
        <FormControl
          component="fieldset"
          variant="filled"
        >
          <FormLabel
            component="legend"
            htmlFor="answers"
          >
            {`Question ${getNextQuestionResult.questionNumber + 1} of ${getNextQuestionResult.totalQuestions}`}
          </FormLabel>
          <RadioGroup
            aria-label="answers"
            id="answers"
            name="answers"
            onChange={handleRadioChange}
          >
            {question.answers.map((a: Answer, i: number) => <FormControlLabel key={a.title} value={a.title} control={<Radio />} label={a.title} />)}
          </RadioGroup>
          <FormHelperText>Choose one</FormHelperText>
        </FormControl>
        <div className="Button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </div>
      </React.Fragment>
    </form>
  );
}

export default TestPage;

