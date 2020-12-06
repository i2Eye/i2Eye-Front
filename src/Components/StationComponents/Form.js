import React, { Component } from "react";
import "../../App.css";
import FormAbled from "./FormAbled";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Success from "./StationForms/Success";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: 1,
      success: false,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    this.setState({
      success: true,
    });
  }

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <div>
        <h3 className="text-right">Currently serving : {params.patientID}</h3>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}
          component={Link}
          to={
            this.props.location.pathname ===
            `/stations/${params.stationName}/edit/${params.patientID}`
              ? `/patient_tracker/screening_review/${params.patientID}`
              : `/stations/patient_search/${params.stationName}/${params.patientID}`
          }
        >
          {this.props.location.pathname ===
          `/stations/${params.stationName}/edit/${params.patientID}`
            ? "Cancel"
            : "Back"}
        </Button>
        {this.state.success && <Success />}
        {!this.state.success && (
          <FormAbled
            stationName={params.stationName}
            id={params.patientID}
            state={this.state.success}
            onChange={this.changeState}
          />
        )}
      </div>
    );
  }
}

export default Form;
