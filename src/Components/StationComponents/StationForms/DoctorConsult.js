import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";

const questions = [
  { question: "Urgent doctor's consult: doctor's notes", id: "Urgent" },
  { question: "Standard doctor's consult: doctor's notes", id: "Standard" },
];

const subQuestions = [
  {
    question: "Reason for consultation/ chief complaint",
    label: "Reason",
    id: "Reason",
  },
  {
    question: "Others (include prescriptions if any)",
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

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        Systolic1: response["Doctor's Consult"][0].answers,
        Diastolic1: response["Doctor's Consult"][1].answers,
        Systolic2: response["Doctor's Consult"][2].answers,
        Diastolic2: response["Doctor's Consult"][3].answers,
      });
      console.log(response.bloodPressure);
    });
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
    alert("Doctor's consult station form submitted successfully!");

    console.log(this.state);
    const answers = {
      "Doctor's Consult": [
        {
          answers: this.state.UrgentReason,
          num: 1,
          question:
            "Urgent doctor's consult: Reason for consultation/chief complaint",
        },
        {
          answers: this.state.UrgentOthers,
          num: 2,
          question:
            "Urgent doctor's consult: Others (include prescriptions if any)",
        },
        {
          answers: this.state.StandardReason,
          num: 3,
          question:
            "Standard doctor's consult: Reason for consultation/chief complaint",
        },
        {
          answers: this.state.StandardOthers,
          num: 4,
          question:
            "Standard doctor's consult: Others (include prescriptions if any)",
        },
      ],
    };

    updatePatientData(this.props.id, answers).then((response) =>
      console.log(response)
    );
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
                        fullWidth
                        onChange={this.handleChange.bind(this)}
                        value={this.state[question.id]}
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
