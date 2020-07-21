import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import VirtualizedTable from "./Components/PatientTrackerComponents/VirtualizedTable";

class PatientTracker extends Component {
  state = { input: "" };

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  };

  getPeople = () => {
    const people = [];
    for (let i = 1; i <= 10000; i++) {
      people[i - 1] = {
        id: i,
        name: "Person " + i,
        age: i,
        gender: i % 2 === 0 ? "F" : "M",
      };
    }
    return people;
  };

  filterPeople = () =>
    this.getPeople().filter(
      (person) =>
        person.name.indexOf(this.state.input) !== -1 ||
        person.id.toString().indexOf(this.state.input) !== -1
    );

  render() {
    return (
      <div>
        <h1>Patient Tracker</h1>
        <TextField
          id="patient-tracker-search"
          label="Search Patient ID"
          variant="outlined"
          onChange={this.handleInput}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Paper style={{ height: 300, width: "100%" }}>
          <VirtualizedTable
            rowCount={this.filterPeople().length}
            rowGetter={({ index }) => this.filterPeople()[index]}
            columns={[
              {
                width: 70,
                label: "ID",
                dataKey: "id",
              },
              {
                width: 200,
                label: "Name",
                dataKey: "name",
              },
              {
                width: 120,
                label: "Age",
                dataKey: "age",
                numeric: true,
              },
              {
                width: 120,
                label: "Gender",
                dataKey: "gender",
                numeric: true,
              },
            ]}
          />
        </Paper>
      </div>
    );
  }
}

export default PatientTracker;
