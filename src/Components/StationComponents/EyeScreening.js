import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const questions = [{ question: "SNC ID" }];

class EyeScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit() {
    //get final data of form
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Eye Screening
        </h1>
        <form>
          {questions.map((question) => (
            <div key={question.question}>
              <span>
                <InputLabel style={{ fontSize: 22, color: "black" }}>
                  {question.question}
                </InputLabel>
                <TextField
                  key={question.question}
                  onChange={this.handleChange.bind(this)}
                  name="search"
                  type="text"
                  label={question.question}
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

export default EyeScreening;
