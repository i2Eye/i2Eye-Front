import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const questions = [{ question: "Dental ID", label: "Dental ID", id: "id" }];

const radioQuestions = [
  {
    question:
      "Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)? ",
    name: "intoxication",
  },
];

const questions1 = [
  {
    question: "If Y to having consumed, what do you consume?",
    id: "product",
  },
];

const radioQuestions1 = [
  {
    question:
      "If Y to having consumed, how many pieces/sticks on average do you consume a day?",
    name: "amount",
  },
];

const questions2 = [
  {
    question:
      "If Y to having consumed, for how long have you been consuming? (e.g. 4y, 5m for 4 years and 5 months)",
    id: "duration",
  },
  {
    question: "If Y to having consumed, why do you still consume?",
    id: "reason",
  },
];

const radioQuestions2 = [
  { question: "Are you still consuming?", name: "consuming" },
];

const questions3 = [
  {
    question: "If N to consuming now, when did you stop consuming?",
    id: "stopDate",
  },
  {
    question: "If N to consuming now, why did you choose to stop?",
    id: "stopReason",
  },
];

const radioQuestions3 = [
  {
    question: "If Y to consuming now, have you tried quitting?",
    name: "quit",
  },
];

const questions4 = [
  { question: "If Y, for how long?", id: "quitDuration" },
  {
    question: "If Y to having tried quitting, what made you consume again?",
    id: "consumeAgainReason",
  },
];

class OralHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "NIL",
      intoxication: "NIL",
      product: "NIL",
      amount: "NIL",
      duration: "NIL",
      reason: "NIL",
      consuming: "NIL",
      stopDate: "NIL",
      stopReason: "NIL",
      quit: "NIL",
      quitDuration: "NIL",
      consumeAgainReason: "NIL",
    };
  }

  handleChange(e) {
    if (e.target.id === "id") {
      this.setState({ id: e.target.value });
    }
    if (e.target.id === "product") {
      this.setState({ product: e.target.value });
    }
    if (e.target.id === "duration") {
      this.setState({ duration: e.target.value });
    }
    if (e.target.id === "reason") {
      this.setState({ reason: e.target.value });
    }
    if (e.target.id === "stopDate") {
      this.setState({ stopDate: e.target.value });
    }
    if (e.target.id === "stopReason") {
      this.setState({ stopReason: e.target.value });
    }
    if (e.target.id === "quitDuration") {
      this.setState({ quitDuration: e.target.value });
    }
    if (e.target.id === "consumeAgainReason") {
      this.setState({ consumeAgainReason: e.target.value });
    }
  }

  handleRadioChange(e) {
    if (e.target.name === "intoxication") {
      this.setState({ intoxication: e.target.value });
    }
    if (e.target.name === "amount") {
      this.setState({ amount: e.target.value });
    }
    if (e.target.name === "consuming") {
      this.setState({ consuming: e.target.value });
    }
    if (e.target.name === "quit") {
      this.setState({ quit: e.target.value });
    }
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>Oral Health</h1>
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
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="number"
                      label={question.label}
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            {radioQuestions.map((question) => (
              <FormControl key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormLabel style={{ fontSize: 22, color: "black" }}>
                    {question.question}
                  </FormLabel>
                </li>
                <RadioGroup
                  name={question.name}
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            ))}
            <p />
            {questions1.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="text"
                      label={question.label}
                      disabled={
                        this.state.intoxication === "Yes" ? false : true
                      }
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            <p />
            {radioQuestions1.map((question) => (
              <FormControl key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormLabel style={{ fontSize: 22, color: "black" }}>
                    {question.question}
                  </FormLabel>
                </li>
                <RadioGroup
                  name={question.name}
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel
                    value="<1 a day"
                    control={<Radio />}
                    label="<1 a day"
                    disabled={this.state.intoxication === "Yes" ? false : true}
                  />
                  <FormControlLabel
                    value="1-10 a day"
                    control={<Radio />}
                    label="1-10 a day"
                    disabled={this.state.intoxication === "Yes" ? false : true}
                  />
                  <FormControlLabel
                    value=">10 a day"
                    control={<Radio />}
                    label=">10 a day"
                    disabled={this.state.intoxication === "Yes" ? false : true}
                  />
                </RadioGroup>
              </FormControl>
            ))}
            <p />
            {questions2.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="text"
                      label={question.label}
                      disabled={
                        this.state.intoxication === "Yes" ? false : true
                      }
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            <p />
            {radioQuestions2.map((question) => (
              <FormControl key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormLabel style={{ fontSize: 22, color: "black" }}>
                    {question.question}
                  </FormLabel>
                </li>
                <RadioGroup
                  name={question.name}
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={this.state.intoxication === "No" ? true : false}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    disabled={this.state.intoxication === "No" ? true : false}
                  />
                </RadioGroup>
              </FormControl>
            ))}
            <p />
            {questions3.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="text"
                      label={question.label}
                      disabled={
                        this.state.consuming === "Yes" ||
                        this.state.intoxication === "No"
                          ? true
                          : false
                      }
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            <p />
            {radioQuestions3.map((question) => (
              <FormControl key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormLabel style={{ fontSize: 22, color: "black" }}>
                    {question.question}
                  </FormLabel>
                </li>
                <RadioGroup
                  name={question.name}
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={
                      this.state.consuming === "No" ||
                      this.state.intoxication === "No"
                        ? true
                        : false
                    }
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    disabled={
                      this.state.consuming === "No" ||
                      this.state.intoxication === "No"
                        ? true
                        : false
                    }
                  />
                </RadioGroup>
              </FormControl>
            ))}
            <p />
            {questions4.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel style={{ fontSize: 22, color: "black" }}>
                      {question.question}
                    </InputLabel>
                    <TextField
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="text"
                      label={question.label}
                      disabled={this.state.quit === "Yes" ? false : true}
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            <Button
              size="large"
              variant="contained"
              color="primary"
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

export default OralHealth;
