import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class PatientSuccess extends Component {


  render() {
    return (
      <div>
        <h1>Saved Successfully</h1>
        < Link to="/patient_tracker">
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.resetForm}
        >
         Back to Patient Tracker
        </Button>
        </Link>
      </div>
    );
  }
}

export default PatientSuccess;
