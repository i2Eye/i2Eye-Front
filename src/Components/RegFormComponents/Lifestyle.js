import React, { Component } from "react";
import { Grid, Paper, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

class Lifestyle extends Component {
  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  prevStep = () => {
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <React.Fragment>
        <h1>Registration</h1>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Typography variant='h4'>Lifestyle</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel id="exercise_freq-label">How often do you exercise or do strenuous activity (lifting heavy objects, farming, construction work) per week?</FormLabel>
                    <Select
                      name="exercise_freq"
                      labelId="exercise_freq-label"
                      id="exercise_freq"
                      onChange={handleChange}
                      value={values.gender}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value="1-2_times">1-2 times week</MenuItem>
                      <MenuItem value="3-4_times">3-4 times a week</MenuItem>
                      <MenuItem value="5-7_times">5-7 times a week</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="exercise_duration-label">How long do you exercise per session (in hours)?</FormLabel>
                  <TextField
                    name="exercise_duration"
                    id="exercise_duration"
                    type="number"
                    onChange={handleChange}
                    defaultValue={values.exercise_duration}
                    fullWidth
                  />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={this.prevStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.nextStep}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

export default Lifestyle;
