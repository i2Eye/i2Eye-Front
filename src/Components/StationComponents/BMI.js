import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const questions = [
  { question: "1. Height (m)", id: "height" },
  { question: "2. Weight (kg)", id: "weight" },
  { question: "3. Waist circumference (cm)", id: "waist" },
];

class BMI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      weight: 0,
      waist: 0,
    };
  }

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
    //get final data of form
    console.log(this.state);
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
                  id={question.id}
                  onChange={this.handleChange.bind(this)}
                  label={question.question}
                  type="number"
                  style={{ width: "250px" }}
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

export default BMI;
