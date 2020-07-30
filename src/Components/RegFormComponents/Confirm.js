import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class Confirm extends Component {
  confirm = (e) => {
    e.preventDefault();
    console.log("Save Edit");
    // *** submit to database *** //
    this.props.nextStep();
  };

  saveEdit = (e) => {
    e.preventDefault();
    console.log("Save Edit");
    this.props.nextStep();
  };

  getSubmitButton = (isEdit) => {
    if (isEdit) {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.saveEdit}
        >
          Save
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.confirm}
        >
          Submit
        </Button>
      );
    }
  };

  render() {
    const {
      isEdit,
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
        {this.getSubmitButton(isEdit)}
      </div>
    );
  }
}

export default Confirm;
