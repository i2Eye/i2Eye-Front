import React, { Component } from "react";
import getTestData from "../../TestData";

const information = [
  { info: "Name", id: "name" },
  { info: "NRIC", id: "nric" },
  { info: "Gender", id: "gender" },
  { info: "Birthdate", id: "birthdate" },
  { info: "Age", id: "age" },
  { info: "Contact Number", id: "contact" },
  { info: "Spoken Language", id: "language" },
  { info: "Any drug allergy", id: "allergy" },
  { info: "Any blood borne diseases", id: "diseases" },
];

const handleEdit = (id) => {
  const data = getTestData(id).registration;
  const newState = {
    name: data[0].answer,
    nric: data[1].answer,
    gender: data[2].answer,
    birthdate: data[3].answer,
    age: data[4].answer,
    contact: data[7].answer,
    language: data[8].answer,
    allergy: data[9].answer,
    diseases: data[10].answer,
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
