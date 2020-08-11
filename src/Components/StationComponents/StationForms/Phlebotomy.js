import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import getTestData from "../../../TestData";

const radioQuestions = [
  {
    num: 1,
    question: "Are you 40 years old or above?",
    helper: "If Yes, proceed with test. If No, check the following conditions.",
  },
];

const checkBoxOptions = [
  { option: "High blood pressure", id: "BP" },
  { option: "Diabetes", id: "Diabetes" },
  { option: "Family member with coronory artery disease", id: "Coronory" },
  { option: "Family member with high cholesterol", id: "Cholesterol" },
  { option: "Chronic kidney disease", id: "Kidney" },
  { option: "Smoking/ intoxication consumption e.g. tobacco", id: "Smoking" },
];

const questions = [
  {
    num: 3,
    question: "Vimta Registration No.",
    helper: "Indicate NIL if did not fulfil any of the criteria for test.",
  },
];

const handleEdit = (id) => {
  const data = getTestData(id).phlebotomy;
  const newState = {
    age:
      data[0].answer === "Y"
        ? "40 and above"
        : data[0].answer === "N"
        ? "Below 40"
        : "",
    conditions: {
      BP: data[1].answer.includes("High blood pressure"),
      Diabetes: data[1].answer.includes("Diabetes"),
      Coronory: data[1].answer.includes(
        "Family member with coronory artery disease"
      ),
      Cholesterol: data[1].answer.includes(
        "Family member with high cholesterol"
      ),
      Kidney: data[1].answer.includes("Chronic kidney disease"),
      Smoking: data[1].answer.includes(
        "Smoking/intoxication consumption e.g. tobacco"
      ),
    },
    vimta: data[2].answer,
    count: data[1].answer.length,
  };
  return newState;
};

class Phlebotomy extends Component {
  state = handleEdit(this.props.id);

  handleSubmit() {
    if (!this.state.age || !this.state.vimta) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
    }
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleConditionsChange(e) {
    if (e.target.name === "BP") {
      this.setState({
        conditions: { ...this.state.conditions, BP: !this.state.conditions.BP },
      });
    }
    if (e.target.name === "Diabetes") {
      this.setState({
        conditions: {
          ...this.state.conditions,
          Diabetes: !this.state.conditions.Diabetes,
        },
      });
    }
    if (e.target.name === "Coronory") {
      this.setState({
        conditions: {
          ...this.state.conditions,
          Coronory: !this.state.conditions.Coronory,
        },
      });
    }
    if (e.target.name === "Cholesterol") {
      this.setState({
        conditions: {
          ...this.state.conditions,
          Cholesterol: !this.state.conditions.Cholesterol,
        },
      });
    }
    if (e.target.name === "Kidney") {
      this.setState({
        conditions: {
          ...this.state.conditions,
          Kidney: !this.state.conditions.Kidney,
        },
      });
    }
    if (e.target.name === "Smoking") {
      this.setState({
        conditions: {
          ...this.state.conditions,
          Smoking: !this.state.conditions.Smoking,
        },
      });
    }
  }

  handleChange(e) {
    this.setState({ vimta: e.target.value });
  }
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Phlebotomy Test
        </h1>
        <form>
          <ol>
            {radioQuestions.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      style={{ fontSize: 22, color: "black" }}
                    >
                      {question.question}
                    </FormLabel>
                    <RadioGroup
                      aria-label="age"
                      name="age"
                      onChange={this.handleAgeChange.bind(this)}
                      value={this.state.age}
                    >
                      <FormControlLabel
                        value="40 and above"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="Below 40"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    <FormHelperText style={{ color: "red", fontSize: 15 }}>
                      {question.helper}
                    </FormHelperText>
                  </FormControl>
                  <p />
                </li>
              </div>
            ))}

            <FormControl component="fieldset">
              <li
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  fontWeight: "normal",
                }}
              >
                <FormLabel
                  component="legend"
                  style={{ fontSize: 22, color: "black" }}
                >
                  Are you suffering from any of the following conditions?
                </FormLabel>
              </li>
              <FormGroup>
                {checkBoxOptions.map((option) => (
                  <FormControlLabel
                    key={option.option}
                    disabled={this.state.age === "40 and above" ? true : false}
                    control={
                      <Checkbox
                        onChange={this.handleConditionsChange.bind(this)}
                        name={option.id}
                        checked={this.state.conditions[option.id]}
                      />
                    }
                    label={option.option}
                  />
                ))}
              </FormGroup>
              <FormHelperText style={{ fontSize: 15, color: "red" }}>
                {
                  "If Yes to > 2 conditions, proceed with test. If Yes to < 2 conditions, skip phlebotomy station."
                }
              </FormHelperText>
            </FormControl>
            <p />
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
                      disabled={this.state.count > 2 ? false : true}
                      key={question.question}
                      onChange={this.handleChange.bind(this)}
                      type="number"
                      label={question.question}
                      style={{ width: 200 }}
                      // defaultValue={
                      //   prevData[question.num - 1].answer === ""
                      //     ? false
                      //     : prevData[question.num - 1].answer
                      // }
                      defaultValue={this.state.vimta}
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

export default Phlebotomy;