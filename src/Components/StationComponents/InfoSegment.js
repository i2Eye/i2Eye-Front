import React, { Component } from "react";
import getTestData from "../../TestData";

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

const handleEdit = (id) => {
  const data = getTestData(id).registration;
  const newState = {
    name: data[0].answer,
    nric: data[1].answer,
    gender: data[2].answer,
    birthdate: data[3].answer,
    age: data[4].answer,
    tubercolosis: data[5].answer,
    livingWithTubercolosis: data[6].answer,
    anyBloodBorneDiseases: data[9].answer,
    bloodBorneDiseases: data[10].answer,
    medicalConditions: data[11].answer,
  };
  return newState;
};
class InfoSegment extends Component {
  state = handleEdit(this.props.id);
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
