import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const questions = [
  { question: "Hb level (g/dL)", label: "Hb level (g/dL)" },
  { question: "How many meals do you eat a day?", label: "Meals per day" },
];

const radioQuestions = [
  {
    question:
      "How often do you eat protein (eg. daal, mung, rajma, chole, chana)",
    id: "protein",
  },
  {
    question: "How often do you eat carbohydrates (eg. chapati, rice)",
    id: "carbohydrates",
  },
  {
    question: "How often do you eat vegetables (eg. gobhi, patta gobhi, saag)",
    id: "vegetables",
  },
  {
    question: "How often do you eat sweets/desserts (eg. gulab jamun)",
    id: "sweets",
  },
];

class Fingerstick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hb: 0,
      meals: 0,
      protein: "",
      carbohydrates: "",
      vegetables: "",
      sweets: "",
    };
  }

  handleRadioChange(e) {
    console.log(e.target.key);
  }
  handleSubmit() {
    //get final data of form
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Fingerstick Blood Test (Anemia)
        </h1>
        <form>
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
                  aria-label="frequency"
                  name="frequency"
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel
                    value="Never"
                    control={<Radio />}
                    label="Never"
                  />
                  <FormControlLabel
                    value="1-2 times a month"
                    control={<Radio />}
                    label="1-2 times a month"
                  />
                  <FormControlLabel
                    value="1-3 times weekly"
                    control={<Radio />}
                    label="1-3 times weekly"
                  />
                  <FormControlLabel
                    value="4-5 times weekly"
                    control={<Radio />}
                    label="4-5 times weekly"
                  />
                  <FormControlLabel
                    value="Once a day"
                    control={<Radio />}
                    label="Once a day"
                  />
                  <FormControlLabel
                    value="More than once daily"
                    control={<Radio />}
                    label="More than once daily"
                  />
                </RadioGroup>
              </FormControl>
              <p />
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

export default Fingerstick;
