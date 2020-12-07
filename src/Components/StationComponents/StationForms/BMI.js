import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { updatePatientData, getPatient } from "../../../dbFunctions";
import ErrorSnackbar from "./ErrorSnackbar";

const questions = [
  { question: "Height (m)", id: "height" },
  { question: "Weight (kg)", id: "weight" },
  { question: "Waist circumference (cm)", id: "waist" },
];

class BMI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      waist: "",
      errorPresent: false,
    };
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        height: response.BMI[0].answers,
        weight: response.BMI[1].answers,
        waist: response.BMI[2].answers,
      });
    });
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

  handleSubmit(e) {
    if (!this.state.height || !this.state.weight || !this.state.waist) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
      const answers = {
        BMI: [
          {
            answers: this.state.height,
            num: 1,
            question: "Height (m)",
          },
          {
            answers: this.state.weight,
            num: 2,
            question: "Weight (kg)",
          },
          {
            answers: this.state.waist,
            num: 3,
            question: "Waist circumference (cm)",
          },
        ],
      };

      updatePatientData(this.props.id, answers).then((response) => {
        // console.log(response);
        if (response === false) {
          console.log("here");
          this.setState({ errorPresent: true });
        } else {
          this.props.onChange();
        }
      });
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
                      //defaultValue={this.state.height}
                      value={this.state[question.id]}
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
        {this.state.errorPresent && (
          <ErrorSnackbar
            message={"Error in BMI form, please submit form again"}
          />
        )}
      </div>
    );
  }
}

export default BMI;
