import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class Confirm extends Component {
  confirm = (e) => {
    e.preventDefault();
    // *** submit to database *** //
    this.props.nextStep();
  };
  render() {
    const {
      values: { name, gender, age, birthday },
      prevStep,
    } = this.props;

    return (
      <div>
        <h1>Confirm?</h1>
        <List>
          <ListItemText primary="Name" secondary={name} />
          <ListItemText primary="Gender" secondary={gender} />
          <ListItemText primary="Age" secondary={age} />
          <ListItemText primary="Birthday" secondary={birthday} />
        </List>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.confirm}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default Confirm;
