import React, { Component } from "react";
import { Grid, Paper, InputAdornment, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

class HouseholdInfo extends Component {
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
                  <Typography variant='h4'>Household Information</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="monthly_household_income"
                    id="monthly_household_income"
                    label="Monthly Household Income (INR) [total]"
                    onChange={handleChange}
                    defaultValue={values.monthly_household_income}
                    type="number"
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel htmlFor="household_count">How many people are there in the household (including yourself)</FormLabel>
                  </FormControl>
                  <TextField
                    name="household_count"
                    id="household_count"
                    type="number"
                    onChange={handleChange}
                    defaultValue={values.household_count}
                    fullWidth
                  />
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

export default HouseholdInfo;
