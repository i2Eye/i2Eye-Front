import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

class RegFormInput extends Component {
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
                  {" "}
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

export default RegFormInput;
