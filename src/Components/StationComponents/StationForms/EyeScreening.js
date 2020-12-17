import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import getTestData from "../../../TestData";
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";
import Success from "./Success";
import ErrorSnackbar from "./ErrorSnackbar";

const questions = [{ question: "SNC ID" }];

class EyeScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      errorPresent: false,
    };
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        id: response["Eye Screening"][0].answers,
      });
    });
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit() {
    if (!this.state.id) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
      alert("Eye screening station form submitted successfully!");
      const answers = {
        "Eye Screening": [
          {
            answers: this.state.id,
            num: 1,
            question: "SNC ID",
          },
        ],
      };

      updatePatientData(this.props.id, answers).then((response) =>
        this.setState({ errorPresent: false }, () => {
          if (response === false) {
            this.setState({ errorPresent: true });
          } else {
            this.props.onChange();
          }
        })
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.errorPresent && (
          <ErrorSnackbar
            message={"Connection error, please submit form again"}
          />
        )}
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Eye Screening
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
                      required
                    >
                      {question.question}
                    </InputLabel>
                    <TextField
                      key={question.question}
                      onChange={this.handleChange.bind(this)}
                      name="search"
                      type="text"
                      label={question.question}
                      value={this.state.id}
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

export default EyeScreening;
