import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import getTestData from "../../../TestData";

const questions = [
  { question: "Height (m)", id: "height" },
  { question: "Weight (kg)", id: "weight" },
  { question: "Waist circumference (cm)", id: "waist" },
];

const handleEdit = (id) => {
  const data = getTestData(id).bmi;
  const newState = {
    height: data[0].answer,
    weight: data[1].answer,
    waist: data[2].answer,
  };
  return newState;
};

class BMI extends Component {
  state = handleEdit(this.props.id);

  handleChange(e) {
    if (e.target.id === "height") {
      this.setState({ height: e.target.value });
    }
    if (e.target.id === "weight") {
      this.setState({ weight: e.target.value });
    }
    if (e.target.id === "waist") {
      this.setState({ waist: e.target.value });
    }
  }

  handleSubmit() {
    if (!this.state.height || !this.state.weight || !this.state.waist) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          BMI & Abdominal Obesity
        </h1>
        <form>
          <ol>
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
                    <InputLabel
                      style={{ fontSize: 22, color: "black" }}
                      size="large"
                      required
                    >
                      {question.question}
                    </InputLabel>
                    <TextField
                      key={question.question}
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      label={question.question}
                      type="number"
                      style={{ width: "250px" }}
                      defaultValue={this.state[question.id]}
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

export default BMI;