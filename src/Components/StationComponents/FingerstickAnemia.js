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
  { question: "Hb level (g/dL)", label: "Hb level (g/dL)", id: "Hb" },
  {
    question: "How many meals do you eat a day?",
    label: "Meals per day",
    id: "meals",
  },
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
      Hb: "",
      meals: "",
      protein: "",
      carbohydrates: "",
      vegetables: "",
      sweets: "",
    };
  }

  handleRadioChange(e) {
    if (e.target.name === "protein") {
      this.setState({ protein: e.target.value });
    }
    if (e.target.name === "carbohydrates") {
      this.setState({ carbohydrates: e.target.value });
    }
    if (e.target.name === "vegetables") {
      this.setState({ vegetables: e.target.value });
    }
    if (e.target.name === "sweets") {
      this.setState({ sweets: e.target.value });
    }
  }

  handleChange(e) {
    if (e.target.id === "Hb") {
      this.setState({ Hb: e.target.value });
    }
    if (e.target.id === "meals") {
      this.setState({ meals: e.target.value });
    }
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
                  id={question.id}
                  onChange={this.handleChange.bind(this)}
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
                  name={question.id}
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
