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
    key: "Systolic1",
  },
  {
    question: "Diastolic BP Reading 1 (mmHg)",
    key: "Diastolic1",
  },
  {
    question: "Systolic BP Reading 2 (mmHg)",
    key: "Systolic2",
  },
  {
    question: "Diastolic BP Reading 2 (mmHg)",
    key: "Diastolic2",
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
      age: "",
      Systolic1: "",
      Diastolic1: "",
      Systolic2: "",
      Diastolic2: "",
    };
  }

  handleSubmit() {
    //get final data of form
    console.log(this.state);
  }

  handleChange(e) {
    if (e.target.id === "Systolic1") {
      this.setState({
        Systolic1: e.target.value,
      });
    }
    if (e.target.id === "Diastolic1") {
      this.setState({
        Diastolic1: e.target.value,
      });
    }
    if (e.target.id === "Systolic2") {
      this.setState({
        Systolic2: e.target.value,
      });
    }
    if (e.target.id === "Diastolic2") {
      this.setState({
        Diastolic2: e.target.value,
      });
    }
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

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
                  onChange={this.handleAgeChange.bind(this)}
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
                  key={question.key}
                  id={question.key}
                  type="text"
                  label={question.question}
                  style={{ width: "300px" }}
                  onChange={this.handleChange.bind(this)}
                  disabled={this.state.age === "18 and below" ? true : false}
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
