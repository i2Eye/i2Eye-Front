import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const questions = [
  { question: "Height (m)" },
  { question: "Weight (kg)" },
  { question: "Waist circumference (cm)" },
];

class BMI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          BMI & Abdominal Obesity
        </h1>
        <form>
          {questions.map((question) => (
            <div key={question.question}>
              <span>
                <InputLabel
                  style={{ fontSize: 22, color: "black" }}
                  margin="normal"
                  size="large"
                >
                  {question.question}
                </InputLabel>
                <TextField
                  key={question.question}
                  // onChange={(e) => {
                  //   console.log(label.DataField, e.target.value);
                  //   props.handleInputChange(label.DataField, e.target.value)}}
                  label={question.question}
                  name="search"
                  type="number"
                  style={{ width: "250px" }}
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

export default BMI;
