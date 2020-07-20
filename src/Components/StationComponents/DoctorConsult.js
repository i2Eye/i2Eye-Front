import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const questions = [
  { question: "Urgent doctor's consult: doctor's notes" },
  { question: "Standard doctor's consult: doctor's notes" },
];

const subQuestions = [
  { question: "Reason for consultation/ chief complaint", label: "Reason" },
  { question: "Others (include prescriptions if any)", label: "Others" },
];

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Doctor's Consult
        </h1>
        <form>
          {questions.map((question) => (
            <div key={question.question}>
              <h2 style={{ fontFamily: "sans-serif", fontSize: 25 }}>
                {question.question}
              </h2>
              {subQuestions.map((subQuestion) => (
                <span>
                  <InputLabel
                    style={{ fontSize: 22, color: "black" }}
                    margin="normal"
                    size="large"
                  >
                    {subQuestion.question}
                  </InputLabel>
                  <p />
                  <TextField
                    id="outlined-multiline-static"
                    label={subQuestion.label}
                    multiline
                    rows={5}
                    variant="outlined"
                    style={{ width: "700px" }}
                  />
                  <p />
                </span>
              ))}
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default Doctor;
