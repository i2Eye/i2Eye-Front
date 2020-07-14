import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import FormSegment from "./FormSegment";
import InfoSegment from "./InfoSegment";

class FormAbled extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container spacing="2">
          <Grid item md="8">
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <FormSegment />
            </Paper>
          </Grid>
          <Grid item md="4">
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
