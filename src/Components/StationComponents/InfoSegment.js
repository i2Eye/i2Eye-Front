import React, { Component } from "react";

const information = [
  { info: "Name" },
  { info: "Gender" },
  { info: "Birthdate" },
  { info: "Age" },
  { info: "District Name" },
  { info: "Address" },
  { info: "Zip Code" },
  { info: "Contact Number" },
  { info: "Spoken Language" },
  { info: "Any drug allergy" },
  { info: "Any blood borne diseases" },
];

class InfoSegment extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          Basic Patient Information
        </h1>
        <ol>
          {information.map((info) => (
            <div>
              <li
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  fontWeight: "normal",
                }}
              >
                {info.info} :
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
