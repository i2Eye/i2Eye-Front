import React, { Component } from "react";
import "../../App.css";
import FormAbled from "./FormAbled";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: 1,
      station: 1,
    };
  }

  render() {
    return (
      <div>
        <h2>Station {this.state.station}</h2>
        <h3 className="text-right">Currently serving : {this.state.patient}</h3>
        <FormAbled />
      </div>
    );
  }
}

export default Form;
