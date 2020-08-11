import React, { Component } from "react";
import "../../App.css";
import FormAbled from "./FormAbled";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}
          component={Link}
          to={`/stations/patient_search/${params.stationName}/${params.patientID}`}
        >
          Back
        </Button>
        <FormAbled stationName={params.stationName} id={params.patientID}/>
      </div>
    );
  }
}

export default Form;
