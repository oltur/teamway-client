import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const TestPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    
    console.log(watch("example"));
    //const { control } = useForm();
  
    const handleRadioChange = (event: { target: { value: any; }; }, value: any) => {
      //setRadioState(event.target.value);
      console.log(event.target.value);
      console.log(value);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <FormControl
            component="fieldset"
            variant="filled"
          // disabled
          >
            <FormLabel
              component="legend"
              htmlFor="residence-type-radio"
            >
              Residence
            </FormLabel>
            <RadioGroup
              aria-label="residence"
              id="residence-type-radio"
              defaultValue="homeowner"
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="homeowner"
                control={<Radio />}
                label="Homeowner"
              />
              <FormControlLabel
                value="renter"
                control={<Radio />}
                label="Renter"
              />
              <FormControlLabel
                value="nomad"
                control={<Radio />}
                label="Nomad" />
            </RadioGroup>
            <FormHelperText>Choose an answer</FormHelperText>
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