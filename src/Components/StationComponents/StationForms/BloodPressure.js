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
import getTestData from "../../../TestData";
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";

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

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        age: response["Blood Pressure"][0].answers,
        Systolic1: response["Blood Pressure"][1].answers,
        Diastolic1: response["Blood Pressure"][2].answers,
        Systolic2: response["Blood Pressure"][3].answers,
        Diastolic2: response["Blood Pressure"][4].answers,
      });
      console.log(response.bloodPressure);
    });
  }

  handleSubmit() {
    //get final data of form
    if (!this.state.age) {
      alert("Required fields cannot be left empty!");
    } else if (
      this.state.age === "Above 18" &&
      (!this.state.Systolic1 ||
        !this.state.Systolic2 ||
        !this.state.Diastolic1 ||
        !this.state.Diastolic2)
    ) {
      alert("Required fields cannot be left empty!");
    } else {
      alert("Blood pressure form submitted successfully!");

      console.log(this.state);
      const answers = {
        "Blood Pressure": [
          {
            answers: this.state.age,
            num: 1,
            question: "Is patient > 18 years old?",
          },
          {
            answers: this.state.Systolic1,
            num: 2,
            question: "Systolic BP Reading 1 (mmHg)",
          },
          {
            answers: this.state.Diastolic1,
            num: 3,
            question: "Diastolic BP Reading 1 (mmHg)",
          },
          {
            answers: this.state.Systolic2,
            num: 4,
            question: "Systolic BP Reading 2 (mmHg)",
          },
          {
            answers: this.state.Diastolic2,
            num: 5,
            question: "Diastolic BP Reading 2 (mmHg)",
          },
        ],
      };

      updatePatientData(this.props.id, answers).then((response) =>
        console.log(response)
      );
    }
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
                      value={this.state.age}
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
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      key={question.key}
                      id={question.key}
                      type="number"
                      label={question.question}
                      style={{ width: "300px" }}
                      onChange={this.handleChange.bind(this)}
                      disabled={
                        this.state.age === "18 and below" ? true : false
                      }
                      value={this.state[question.key]}
                    />
                    <p />
                  </span>
                </li>
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

export default BloodPressure;
