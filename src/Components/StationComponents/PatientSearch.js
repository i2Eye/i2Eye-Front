import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class PatientSearch extends Component {
  state = {
    swtich: true,
    people: [
      { id: 1, name: "Person 1", age: 10, gender: "M", available: false },
      { id: 2, name: "Person 2", age: 20, gender: "F", available: true },
      { id: 3, name: "Person 3", age: 30, gender: "M", available: true },
    ],
    selected: false,
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={() => this.setState({ selected: true })}
          disabled={this.state.selected}
        >
          Get Next Person
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={() => this.setState({ selected: false })}
          disabled={!this.state.selected}
        >
          Cancel
        </Button>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          disabled={!this.state.selected}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default PatientSearch;
