import React, { Component } from "react";
import { getPatient } from "../../dbFunctions";

const information = [
  { info: "Name", id: "name" },
  { info: "NRIC", id: "nric" },
  { info: "Gender", id: "gender" },
  { info: "Birthdate", id: "birthdate" },
  { info: "Age", id: "age" },
  {
    info: "Have tubercolosis?",
    id: "tubercolosis",
  },
  {
    info: "Living with someone with tubercolosis?",
    id: "livingWithTubercolosis",
  },
  {
    info: "Any blood borne diseases?",
    id: "anyBloodBorneDiseases",
  },
  {
    info: "Blood borne disease",
    id: "bloodBorneDisease",
  },
  {
    info: "Pre-existing medical conditions",
    id: "medicalConditions",
  },
];

class InfoSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nric: "",
      gender: "",
      birthdate: "",
      age: "",
      tubercolosis: "",
      livingWithTubercolosis: "",
      anyBloodBorneDiseases: "",
      bloodBorneDiseases: "",
    };
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      this.setState({
        name: response.Registration[0].answers,
        nric: response.Registration[1].answers,
        gender: response.Registration[2].answers,
        birthdate: response.Registration[3].answers,
        age: response.Registration[4].answers,
        tubercolosis: response.Registration[5].answers,
        livingWithTubercolosis: response.Registration[6].answers,
        anyBloodBorneDiseases: response.Registration[9].answers,
        bloodBorneDiseases: response.Registration[10].answers,
      });
      console.log(response.Registration);
    });
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Basic Patient Information
        </h1>
        <ol>
          {information.map((info) => (
            <div key={info.info}>
              <li
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  fontWeight: "normal",
                }}
              >
                {info.info} : {this.state[info.id]}
              </li>
              <p />
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

export default InfoSegment;
