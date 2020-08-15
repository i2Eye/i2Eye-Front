import React from "react";
import { Field } from 'formik';
import { Grid, Paper, FormLabel, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export const Lifestyle = ({
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
                  <Typography variant='h4'>Lifestyle</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={touched.exercise_freq && errors.exercise_freq}>
                    <FormLabel id="exercise_freq-label">How often do you exercise or do strenuous activity (lifting heavy objects, farming, construction work) per week?</FormLabel>
                    <Field
                      as={Select}
                      name="exercise_freq"
                      labelId="exercise_freq-label"
                      id="exercise_freq"
                      onChange={handleChange}
                      value={values.exercise_freq}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value="1-2_times">1-2 times week</MenuItem>
                      <MenuItem value="3-4_times">3-4 times a week</MenuItem>
                      <MenuItem value="5-7_times">5-7 times a week</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.exercise_freq && errors.exercise_freq) && errors.exercise_freq}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth required error={touched.exercise_duration && errors.exercise_duration}>
                    <FormLabel id="exercise_duration-label">How long do you exercise per session (in hours)?</FormLabel>
                  <Field
                    as={TextField}
                    required
                    name="exercise_duration"
                    id="exercise_duration"
                    type="number"
                    onChange={handleChange}
                    value={values.exercise_duration}
                    autoComplete="off"
                    fullWidth
                    error={touched.exercise_duration && errors.exercise_duration}
                    helperText={touched.exercise_duration && errors.exercise_duration}
                  />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default Lifestyle;
