import React, { Component } from "react";
import "../../App.css";
import FormAbled from "./FormAbled";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: 1,
    };
  }

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <div>
        <h2>Station {this.state.station}</h2>
        <h3 className="text-right">Currently serving : {params.patientID}</h3>
        <FormAbled stationName={params.stationName} />
      </div>
    );
  }
}

export default Form;
