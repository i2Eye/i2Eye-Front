import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
//import FormSegment from "./FormSegment";
import InfoSegment from "./InfoSegment";
import BMI from "./StationForms/BMI";
import EyeScreening from "./StationForms/EyeScreening";
import FingerstickAnemia from "./StationForms/FingerstickAnemia";
import Fingerstick from "./StationForms/Fingerstick";
import BloodPressure from "./StationForms/BloodPressure";
import Doctor from "./StationForms/DoctorConsult";
import Phlebotomy from "./StationForms/Phlebotomy";
import OralHealth from "./StationForms/OralHealth";

class FormAbled extends Component {
  state = {};

  forms = {
    oralHealth: OralHealth,
    bmi: BMI,
    eyeScreening: EyeScreening,
    phlebotomy: Phlebotomy,
    fingerstickAnemia: FingerstickAnemia,
  };

  render() {
    const { stationName } = this.props;
    const StationTag = this.forms[stationName || OralHealth];
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={7}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <StationTag />
            </Paper>
          </Grid>
          <Grid item md={5}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <InfoSegment />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormAbled;