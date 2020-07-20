import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
//import FormSegment from "./FormSegment";
import InfoSegment from "./InfoSegment";
import Tobacco from "./BMI";
import BMI from "./BMI";
import EyeScreening from "./EyeScreening";
import FingerstickAnemia from "./FingerstickAnemia";
import Fingerstick from "./Fingerstick";
import BloodPressure from "./BloodPressure";
import Doctor from "./DoctorConsult";
import Phlebotomy from "./Phlebotomy";
import OralHealth from "./OralHealth";

class FormAbled extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container spacing="2">
          <Grid item md="7">
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <Phlebotomy />
            </Paper>
          </Grid>
          <Grid item md="5">
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
