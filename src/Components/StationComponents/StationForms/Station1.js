import React, { Component } from "react";
class Station1 extends Component {
  state = {};
  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div>
        <h1>Station 1</h1>
        <p>Patient ID: {params.patientID}</p>
      </div>
    );
  }
}

export default Station1;
