import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import getTestData from "../../../TestData";
import "../../../dbFunctions";
import { updatePatientData } from "../../../dbFunctions";

const questions = [{ question: "SNC ID" }];

const handleEdit = (id) => {
  const data = getTestData(id).eyeScreening;
  const newState = {
    id: data[0].answer,
  };
  return newState;
};

class EyeScreening extends Component {
  state = handleEdit(this.props.id);

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit() {
    if (!this.state.id) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
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
        console.log(response)
      );
    }
  }

  render() {
    return (
      <div>
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
                      defaultValue={this.state.id}
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
