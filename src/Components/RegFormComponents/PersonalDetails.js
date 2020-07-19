import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

class PersonalDetails extends Component {
  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
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
                  <Typography variant='h4'>Personal Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="name"
                    id="name"
                    label="Name"
                    onChange={handleChange}
                    defaultValue={values.name}
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="nric"
                    id="nric"
                    label="NRIC"
                    onChange={handleChange}
                    defaultValue={values.nric}
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      name="gender"
                      labelId="gender-label"
                      id="gender"
                      onChange={handleChange}
                      value={values.gender}
                    >
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"M"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="age"
                    id="age"
                    label="Age"
                    type="number"
                    onChange={handleChange}
                    defaultValue={values.age}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="birthday"
                    id="date"
                    label="Birthday"
                    type="date"
                    onChange={handleChange}
                    defaultValue={values.birthday}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="education-label">Highest Education Qualification</InputLabel>
                    <Select
                      name="education"
                      labelId="education-label"
                      id="education"
                      onChange={handleChange}
                      value={values.education}
                    >
                      <MenuItem value="no_formal_qualification">No formal qualification</MenuItem>
                      <MenuItem value="primary">Primary(complete 6th standard)</MenuItem>
                      <MenuItem value="secondary">Secondary</MenuItem>
                      <MenuItem value="higher_secondary">Higher Secondary</MenuItem>
                      <MenuItem value="above_higher_secondary">Above higher secondary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="occupation-label">Occupation</InputLabel>
                    <Select
                      name="occupation"
                      labelId="occupation-label"
                      id="occupation"
                      onChange={handleChange}
                      value={values.occupation}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="homemaker">Homemaker/Housewife</MenuItem>
                      <MenuItem value="religious_work">Religious Work</MenuItem>
                      <MenuItem value="professional">Professional (teacher, engineer, architect, doctor, nurse, lawyer, management, finance, etc)</MenuItem>
                      <MenuItem value="service_industry">Service industry (e.g. restaurant server, call centre, receptionist, hotel staff)</MenuItem>
                      <MenuItem value="manual_labourer">Manual labourer (e.g. farming, mining, construction, cleaning)</MenuItem>
                      <MenuItem value="skilled_labourer">Skilled labourer (e.g. plumbing, electrician, cook, tailor)</MenuItem>
                      <MenuItem value="manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="unemployed">Unemployed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
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

export default PersonalDetails;
