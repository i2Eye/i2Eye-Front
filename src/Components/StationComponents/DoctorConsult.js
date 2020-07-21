import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const questions = [
  { question: "1. Urgent doctor's consult: doctor's notes", id: "Urgent" },
  { question: "2. Standard doctor's consult: doctor's notes", id: "Standard" },
];

const subQuestions = [
  {
    question: "a) Reason for consultation/ chief complaint",
    label: "Reason",
    id: "Reason",
  },
  {
    question: "b) Others (include prescriptions if any)",
    label: "Others",
    id: "Others",
  },
];

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UrgentReason: "",
      UrgentOthers: "",
      StandardReason: "",
      StandardOthers: "",
    };
  }

  handleChange(e) {
    if (e.target.id === "UrgentReason") {
      this.setState({
        UrgentReason: e.target.value,
      });
    }
    if (e.target.id === "UrgentOthers") {
      this.setState({
        UrgentOthers: e.target.value,
      });
    }
    if (e.target.id === "StandardReason") {
      this.setState({
        StandardReason: e.target.value,
      });
    }
    if (e.target.id === "StandardOthers") {
      this.setState({
        StandardOthers: e.target.value,
      });
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
          Doctor's Consult
        </h1>
        <form>
          {questions.map((question) => (
            <div key={question.question}>
              <h2 style={{ fontFamily: "sans-serif", fontSize: 25 }}>
                {question.question}
              </h2>
              <ol>
                {subQuestions.map((subQuestion) => (
                  <span>
                    <li
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: 22,
                        fontWeight: "normal",
                      }}
                    >
                      <InputLabel
                        style={{ fontSize: 22, color: "black" }}
                        margin="normal"
                        size="large"
                      >
                        {subQuestion.question}
                      </InputLabel>
                      <p />
                      <TextField
                        id={question.id + subQuestion.id}
                        label={subQuestion.label}
                        multiline
                        rows={5}
                        variant="outlined"
                        style={{ width: "700px" }}
                        onChange={this.handleChange.bind(this)}
                      />
                      <p />
                    </li>
                  </span>
                ))}
              </ol>
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

export default Doctor;
