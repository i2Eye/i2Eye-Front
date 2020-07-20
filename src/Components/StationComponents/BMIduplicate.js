import React, { Component } from "react";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class BMIDuplicate extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>BMI & Abdominal Obesity</h1>
        <form>
            <InputLabel>Age?</InputLabel>
            <TextField></TextField>
        </form>
      </div>
    );
  }
}

export default BMIDuplicate;
