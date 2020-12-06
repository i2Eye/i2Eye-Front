import React, { useEffect } from "react";
import { Grid, Paper, Typography, FormLabel, Checkbox, FormControlLabel, FormGroup, FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const SelectStations = ({
  values,
  handleChange,
  setFieldValue,
}) => {

    useEffect(() => {
      // set any compulsory stations based on user inputs of medical conditions
      if (values.has_tubercolosis == true || 
        values.other_diagnosed_with_tubercolosis_beyond_4_months == true || 
        values.symptoms.length > 1 ) {
        setFieldValue('station8', true);
      } else {
        setFieldValue('station8', false);
      }
    }, [values.has_tubercolosis, values.other_diagnosed_with_tubercolosis_beyond_4_months, values.symptoms.length])

    const manageSelectedStations = (name, boolValue) => {
      if (boolValue === true && values.selectedStations.indexOf(name) === -1) {
        values.selectedStations.push(name);
      } else if (!boolValue && values.selectedStations.indexOf(name) !== -1) {
        const removeIndex = values.selectedStations.indexOf(name);
        values.selectedStations.splice(removeIndex, 1);
      }
      //console.log(values.selectedStations);
    };

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
                  <Typography variant="h4">Selection of Stations</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel htmlFor="stations">
                      Please select all the stations you would like to go
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={values.station1} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station1", e.target.checked);
                        }} 
                        name="station1" />}
                        label="Station 1 Oral Health"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station2} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station2", e.target.checked);
                        }} 
                        name="station2" />}
                        label="Station 2 BMI &amp; Abdominal Obesity"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station3} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station3", e.target.checked);
                        }} 
                        name="station3" />}
                        label="Station 3 Eye Screening"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station4} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station4", e.target.checked);
                        }} 
                        name="station4" />}
                        label="Station 4 Phlebotomy Test"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station5} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station5", e.target.checked);
                        }} 
                        name="station5" />}
                        label="Station 5 Fingerstick Blood Test (Anemia)"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station6} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station6", e.target.checked);
                        }} 
                        name="station6" />}
                        label="Station 6 Fingerstick Blood Test (RCBG)"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station7} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station7", e.target.checked);
                        }} 
                        name="station7" />}
                        label="Station 7 Blood Pressure"
                      />

                      <FormControlLabel
                        control={<Checkbox checked={values.station8} 
                        onChange={(e) => {
                          handleChange(e);
                          manageSelectedStations("station8", e.target.checked);
                        }} 
                        name="station8" />}
                        label="Station 8 Doctor's Consult"
                        disabled={
                          values.has_tubercolosis == true || 
                          values.other_diagnosed_with_tubercolosis_beyond_4_months == true || 
                          values.symptoms.length > 1 }
                      />

                    </FormGroup>
                  </FormControl>
                </Grid>

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default SelectStations;
