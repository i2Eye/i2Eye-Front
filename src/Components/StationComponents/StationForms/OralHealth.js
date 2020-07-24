import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const questions = [
  { question: "Dental ID", label: "Dental ID", id: "id", type: "text" },
  {
    question:
      "Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)? ",
    name: "intoxication",
    type: "radio",
    options: [{ option: "Yes" }, { option: "No" }],
  },
  {
    question: "If Y to having consumed, what do you consume?",
    id: "product",
    type: "text",
  },
  {
    question:
      "If Y to having consumed, how many pieces/sticks on average do you consume a day?",
    name: "amount",
    type: "radio",
    options: [
      { option: "<1 a day" },
      { option: "1-10 a day" },
      { option: ">10 a day" },
    ],
  },
  {
    question:
      "If Y to having consumed, for how long have you been consuming? (e.g. 4y, 5m for 4 years and 5 months)",
    id: "duration",
    type: "text",
  },
  {
    question: "If Y to having consumed, why do you still consume?",
    id: "reason",
    type: "text",
  },
  {
    question: "Are you still consuming?",
    name: "consuming",
    type: "radio",
    options: [{ option: "Yes" }, { option: "No" }],
  },
  {
    question: "If N to consuming now, when did you stop consuming?",
    id: "stopDate",
    type: "text",
  },
  {
    question: "If N to consuming now, why did you choose to stop?",
    id: "stopReason",
    type: "text",
  },
  {
    question: "If Y to consuming now, have you tried quitting?",
    name: "quit",
    type: "radio",
    options: [{ option: "Yes" }, { option: "No" }],
  },
  { question: "If Y, for how long?", id: "quitDuration", type: "text" },
  {
    question: "If Y to having tried quitting, what made you consume again?",
    id: "consumeAgainReason",
    type: "text",
  },
];

class OralHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      intoxication: "",
      product: "",
      amount: "",
      duration: "",
      reason: "",
      consuming: "",
      stopDate: "",
      stopReason: "",
      quit: "",
      quitDuration: "",
      consumeAgainReason: "",
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
            {questions.map((question) =>
              question.type === "text" ? (
                <div>
                  <li
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 22,
                      fontWeight: "normal",
                    }}
                  >
                    <p />
                    <span>
                      <InputLabel
                        style={{ fontSize: 22, color: "black" }}
                        required={
                          question.id === "id"
                            ? true
                            : this.state.consuming === "Yes" &&
                              (question.id === "stopDate" ||
                                question.id === "stopReason")
                            ? false
                            : this.state.consuming === "No" &&
                              (question.id === "quitDuration" ||
                                question.id === "consumeAgainReason")
                            ? false
                            : this.state.quit === "No" &&
                              (question.id === "quitDuration" ||
                                question.id === "consumeAgainReason")
                            ? false
                            : this.state.intoxication === "No"
                            ? false
                            : true
                        }
                      >
                        {question.question}
                      </InputLabel>
                      <TextField
                        id={question.id}
                        onChange={this.handleChange.bind(this)}
                        type="text"
                        label={question.label}
                        disabled={
                          question.id === "id"
                            ? false
                            : this.state.consuming === "Yes" &&
                              (question.id === "stopDate" ||
                                question.id === "stopReason")
                            ? true
                            : this.state.consuming === "No" &&
                              (question.id === "quitDuration" ||
                                question.id === "consumeAgainReason")
                            ? true
                            : this.state.quit === "No"
                            ? true
                            : this.state.intoxication === "Yes"
                            ? false
                            : true
                        }
                      />
                      <p />
                    </span>
                  </li>
                </div>
              ) : (
                <FormControl key={question.question}>
                  <li
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 22,
                      fontWeight: "normal",
                    }}
                  >
                    <FormLabel
                      style={{ fontSize: 22, color: "black" }}
                      required={
                        this.state.consuming === "No" &&
                        question.name === "quit"
                          ? false
                          : this.state.intoxication === "Yes"
                          ? true
                          : false
                      }
                    >
                      {question.question}
                    </FormLabel>
                  </li>

                  <RadioGroup
                    name={question.name}
                    onChange={this.handleRadioChange.bind(this)}
                  >
                    {question.options.map((option) => (
                      <div>
                        <FormControlLabel
                          value={option.option}
                          control={<Radio />}
                          label={option.option}
                          disabled={
                            question.name === "intoxication"
                              ? false
                              : this.state.consuming === "No" &&
                                question.name === "quit"
                              ? true
                              : this.state.intoxication === "Yes"
                              ? false
                              : true
                          }
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )
            )}
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
