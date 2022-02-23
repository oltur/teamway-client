import { AlignVerticalCenterTwoTone } from "@mui/icons-material";
import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/auth";
import { getNextQuestion, answerQuestion, getTestResult, getTestByTitle } from './testAPI';
import { useNavigate, useLocation } from "react-router-dom";
import * as H from "history";
import { Test, Question, Answer } from "./Test";

interface stateType {
  from: { pathname: string }
}

function TestPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let l = location as H.Location;

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
      if(answer == "") {
        alert("Please choose an answer");
      }
      console.log(testId, question.title, answer);
      let z = answerQuestion(auth.authenticatedUser.token, testId, question.title, answer)
    }
    
    //console.log(watch("example"));
    //const { control } = useForm();
  
    const handleRadioChange = (event: { target: { value: any; }; }, value: any) => {
      setAnswer(value);
    };
  
    const [testId, setTestId] = useState("");
    const [question, setQuestion] = useState({title:"", answers:[{title:""}]});
    const [answer, setAnswer] = useState("");

    useEffect(() => {
      (async () => {
        try {
        const test = await getTestByTitle(auth.authenticatedUser.token, "Are you an introvert or an extrovert?");
        setTestId(test.id)
        const questionTitle = await getNextQuestion(auth.authenticatedUser.token, test.id);
        if (questionTitle == "") {
          const result = await getTestResult(auth.authenticatedUser.token, testId)
          alert(result)
          navigate("/")
        }
        const question = test.questions.find((q:Question) => q.title == questionTitle); 
        setQuestion(question!);
        }
        catch (error) {
          if (error === "Unauthorized") {
            navigate(l, { replace: true });
          }
        }
      })();
    })

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
          {question.title}
          </Typography>
          <FormControl
            component="fieldset"
            variant="filled"
          // disabled
          >
            <RadioGroup
              aria-label="answers"
              id="answers"
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              {question.answers.map((a: Answer, i: number) => <FormControlLabel key={a.title} value={a.title} control={<Radio />} label={a.title} />)}
            </RadioGroup>
            <FormHelperText>Choose one</FormHelperText>
          </FormControl>
          {/* <input defaultValue="test" {...register("example")} />
          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>} */}
          <div className="Button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          </div>
        </React.Fragment>
      </form>
    );
}
  
export default TestPage;

