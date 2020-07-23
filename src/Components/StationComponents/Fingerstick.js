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
    question: "Randomy capillary blood glucose (mg/dL)",
    label: "RCBG (mg/dL)",
    id: "RCBG",
  },
];

const radioQuestions = [
  {
    question: "Is patient > 18 years old?",
    helper: "If Yes, proceed. If No, skip RCBG station.",
  },
];
class EyeScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RCBG: 0,
      age: "",
    };
  }

  handleSubmit() {
    //get final data of form
    console.log(this.state);
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleChange(e) {
    this.setState({ RCBG: e.target.value });
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Fingerstick Blood Test (RCBG)
        </h1>
        <form>
          <ol>
            {radioQuestions.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
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
                </li>
              </div>
            ))}
            {questions.map((question) => (
              <div key={question.question}>
                <span>
                  <li
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 22,
                      fontWeight: "normal",
                    }}
                  >
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      disabled={
                        this.state.age === "18 and below" ? true : false
                      }
                      key={question.question}
                      onChange={this.handleChange.bind(this)}
                      type="number"
                      label={question.label}
                    />
                    <p />
                  </li>
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
          </ol>
        </form>
      </div>
    );
  }
}

export default EyeScreening;
