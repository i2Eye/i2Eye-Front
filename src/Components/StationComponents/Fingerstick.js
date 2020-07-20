import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const questions = [
  {
    question: "Randomy capillary blood glucose (mg/dL)",
    label: "RCBG (mg/dL)",
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
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Fingerstick Blood Test (RCBG)
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
                  type="number"
                  label={question.label}
                />
                <p />
              </span>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default EyeScreening;
