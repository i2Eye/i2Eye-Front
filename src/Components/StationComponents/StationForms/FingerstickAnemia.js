import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import getTestData from "../../../TestData";
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";

const questions = [
  { num: 1, question: "Hb level (g/dL)", label: "Hb level (g/dL)", id: "Hb" },
  {
    num: 2,
    question: "How many meals do you eat a day?",
    label: "Meals per day",
    id: "meals",
  },
];

const radioQuestions = [
  {
    num: 3,
    question:
      "How often do you eat protein (eg. daal, mung, rajma, chole, chana)",
    id: "protein",
  },
  {
    num: 4,
    question: "How often do you eat carbohydrates (eg. chapati, rice)",
    id: "carbohydrates",
  },
  {
    num: 5,
    question: "How often do you eat vegetables (eg. gobhi, patta gobhi, saag)",
    id: "vegetables",
  },
  {
    num: 6,
    question: "How often do you eat sweets/desserts (eg. gulab jamun)",
    id: "sweets",
  },
];

class Fingerstick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hb: "",
      meals: "",
      protein: "",
      carbohydrates: "",
      vegetables: "",
      sweets: "",
    };
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        Hb: response["Fingerstick Blood Test (Anemia)"][0].answers,
        meals: response["Fingerstick Blood Test (Anemia)"][1].answers,
        protein: response["Fingerstick Blood Test (Anemia)"][2].answers,
        carbohydrates: response["Fingerstick Blood Test (Anemia)"][3].answers,
        vegetables: response["Fingerstick Blood Test (Anemia)"][4].answers,
        sweets: response["Fingerstick Blood Test (Anemia)"][4].answers,
      });
    });
  }

  handleRadioChange(e) {
    if (e.target.name === "protein") {
      this.setState({ protein: e.target.value });
    }
    if (e.target.name === "carbohydrates") {
      this.setState({ carbohydrates: e.target.value });
    }
    if (e.target.name === "vegetables") {
      this.setState({ vegetables: e.target.value });
    }
    if (e.target.name === "sweets") {
      this.setState({ sweets: e.target.value });
    }
  }

  handleChange(e) {
    if (e.target.id === "Hb") {
      this.setState({ Hb: e.target.value });
    }
    if (e.target.id === "meals") {
      this.setState({ meals: e.target.value });
    }
  }

  handleSubmit() {
    if (
      !this.state.Hb ||
      !this.state.meals ||
      !this.state.protein ||
      !this.state.carbohydrates ||
      !this.state.vegetables ||
      !this.state.sweets
    ) {
      alert("Required fields cannot be left empty!");
    } else {
      //get final data of form
      console.log(this.state);
      const answers = {
        "Fingerstick Blood Test (Anemia)": [
          {
            answers: this.state.Hb,
            num: 1,
            question: "Hb level (g/dL)",
          },
          {
            answers: this.state.meals,
            num: 2,
            question: "How many meals do you eat a day?",
          },
          {
            answers: this.state.protein,
            num: 3,
            question:
              "How often do you eat protein (eg. daal, mung, rajma, chole, chana)?",
          },
          {
            answers: this.state.carbohydrates,
            num: 4,
            question: "How often do you eat carbohydrates (eg. chapati, rice)?",
          },
          {
            answers: this.state.vegetables,
            num: 5,
            question:
              "How often do you eat vegetables (eg. gobhi, patta gobhi, saag)?",
          },
          {
            answers: this.state.sweets,
            num: 6,
            question: "How often do you eat sweets/desserts (eg. gulab jamun)?",
          },
        ],
      };

      updatePatientData(this.props.id, answers).then((response) =>
        console.log(response)
      );
    }
  }

  render() {
    const data = getTestData(this.props.patientID);
    const prevData = data.fingerstickAnemia;

    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Fingerstick Blood Test (Anemia)
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
                      id={question.id}
                      onChange={this.handleChange.bind(this)}
                      type="number"
                      label={question.label}
                      value={this.state[question.id]}
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
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
                      required
                    >
                      {question.question}
                    </FormLabel>
                    <RadioGroup
                      aria-label="frequency"
                      name={question.id}
                      onChange={this.handleRadioChange.bind(this)}
                      value={this.state[question.id]}
                    >
                      <FormControlLabel
                        value="Never"
                        control={<Radio />}
                        label="Never"
                      />
                      <FormControlLabel
                        value="1-2 times a month"
                        control={<Radio />}
                        label="1-2 times a month"
                      />
                      <FormControlLabel
                        value="1-3 times weekly"
                        control={<Radio />}
                        label="1-3 times weekly"
                      />
                      <FormControlLabel
                        value="4-5 times weekly"
                        control={<Radio />}
                        label="4-5 times weekly"
                      />
                      <FormControlLabel
                        value="Once a day"
                        control={<Radio />}
                        label="Once a day"
                      />
                      <FormControlLabel
                        value="More than once daily"
                        control={<Radio />}
                        label="More than once daily"
                      />
                    </RadioGroup>
                  </FormControl>
                  <p />
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

export default Fingerstick;
