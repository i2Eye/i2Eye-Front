import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const questions = [
  {
    question: "Vimta Registration No.",
    helper: "Indicate NIL if did not fulfil any of the criteria for test.",
  },
];

const radioQuestions = [
  {
    question: "Are you 40 years old or above?",
    helper: "If Yes, proceed with test. If No, check the following conditions.",
  },
];

const checkBoxOptions = [
  { option: "High blood pressure" },
  { option: "Diabetes" },
  { option: "Family member with coronory artery disease" },
  { option: "Family member with high cholesterol" },
  { option: "Chronic kidney disease" },
  { option: "Smoking/ intoxication consumption e.g. tobacco" },
];

class Phlebotomy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      conditions: [],
      vimta: "",
    };
  }

  handleSubmit() {
    //get final data of form
    console.log(this.state);
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleConditionsChange(e) {
    const newCondition = e.target.value;
    this.state.conditions.push(newCondition);
  }

  handleChange(e) {
    this.setState({ vimta: e.target.value });
  }
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Phlebotomy Test
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
                  onChange={this.handleAgeChange.bind(this)}
                >
                  <FormControlLabel
                    value="40 and above"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="Below 40"
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

          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: 22, color: "black" }}
            >
              Are you suffering from any of the following conditions?
            </FormLabel>
            <FormGroup>
              {checkBoxOptions.map((option) => (
                <FormControlLabel
                  disabled={this.state.age === "40 and above" ? false : true}
                  control={
                    <Checkbox
                      onChange={this.handleConditionsChange.bind(this)}
                      name={option.option}
                      value={option.option}
                    />
                  }
                  label={option.option}
                />
              ))}
            </FormGroup>
            <FormHelperText style={{ fontSize: 15, color: "red" }}>
              {
                "If < 40 years & Yes to > 2 conditions, proceed with test. If Yes to < 2 conditions & < 40 years, skip phlebotomy station. If No to any of the conditions and > 40 years, proceed with test."
              }
            </FormHelperText>
          </FormControl>
          <p />
          {questions.map((question) => (
            <div key={question.question}>
              <span>
                <InputLabel style={{ fontSize: 22, color: "black" }}>
                  {question.question}
                </InputLabel>
                <TextField
                  key={question.question}
                  onChange={this.handleChange.bind(this)}
                  name="search"
                  type="number"
                  label={question.question}
                />
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

export default Phlebotomy;
