import React, { Component } from "react";
import { Field } from 'formik';
import { Grid, Paper, InputAdornment, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

export const HouseholdInfo = ({
  values,
  errors,
  touched,
  handleChange,
}) => {

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
                  <Field
                    as={TextField}
                    required
                    name="monthly_household_income"
                    id="monthly_household_income"
                    label="Monthly Household Income (INR) [total]"
                    onChange={handleChange}
                    value={values.monthly_household_income}
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
                    error={touched.monthly_household_income && errors.monthly_household_income}
                    helperText={touched.monthly_household_income && errors.monthly_household_income}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required error={touched.household_count && errors.household_count}>
                    <FormLabel htmlFor="household_count">How many people are there in the household (including yourself)?</FormLabel>
                  </FormControl>
                  <Field
                    as={TextField}
                    required
                    name="household_count"
                    id="household_count"
                    type="number"
                    onChange={handleChange}
                    value={values.household_count}
                    fullWidth
                    error={touched.household_count && errors.household_count}
                    helperText={touched.household_count && errors.household_count}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default HouseholdInfo;
