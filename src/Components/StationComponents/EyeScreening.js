import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const questions = [{ question: "SNC ID" }];

class EyeScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  // onChange={(e) => {
                  //   console.log(label.DataField, e.target.value);
                  //   props.handleInputChange(label.DataField, e.target.value)}}
                  //value={props.search}
                  name="search"
                  type="text"
                  label={question.question}
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

export default EyeScreening;
