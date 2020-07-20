import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

const questions = [
  {
    question: "Systolic BP Reading 1 (mmHg)",
  },
  {
    question: "Diastolic BP Reading 1 (mmHg)",
  },
  {
    question: "Systolic BP Reading 2 (mmHg)",
  },
  {
    question: "Diastolic BP Reading 2 (mmHg)",
  },
];

const radioQuestions = [
  {
    question: "Is patient > 18 years old?",
    helper: "If Yes, proceed. If No, skip blood pressure station.",
  },
];
class BloodPressure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      Systolic1: 0,
      Diastolic1: 0,
      Systolic2: 0,
      Diastolic2: 0,
    };
  }

  handleSubmit(e) {}

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Blood Pressure
        </h1>
        <form>
          {radioQuestions.map((question) => (
            <div key={question.question}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{ fontSize: 22, color: "black" }}
                >
                  {question.question}
                </FormLabel>
                <RadioGroup
                  aria-label="age"
                  name="age"
                  //onChange={handleChange}
                >
                  <FormControlLabel
                    value="Above 18"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="18 and below"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <FormHelperText style={{ color: "red", fontSize: 15 }}>
                  {question.helper}
                </FormHelperText>
              </FormControl>
              <p />
            </div>
          ))}
          {questions.map((question) => (
            <div key={question.question}>
              <span>
                <InputLabel style={{ fontSize: 22, color: "black" }}>
                  {question.question}
                </InputLabel>
                <TextField
                  key={question.question}
                  // onChange={(e) => {
                  //   console.log(label.DataField, e.target.value);
                  //   props.handleInputChange(label.DataField, e.target.value)}}
                  //value={props.search}
                  name="search"
                  type="text"
                  label={question.question}
                  style={{ width: "300px" }}
                />
                <FormHelperText style={{ color: "red", fontSize: 15 }}>
                  Indicate NIL if did not fulfil criteria for test.
                </FormHelperText>
                <p />
              </span>
            </div>
          ))}
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default BloodPressure;
