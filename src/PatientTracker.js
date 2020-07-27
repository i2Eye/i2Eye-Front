import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Filter from "./Components/PatientTrackerComponents/Filter";
import VirtualizedTable from "./Components/PatientTrackerComponents/VirtualizedTable";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = (theme) => ({
  root: {
    width: 300,
    marginBottom: 20,
    marginRight: 20,
    verticalAlign: "top",
    position: "absolute",
  },
  container: {
    height: 56,
    display: "inline-block",
    minWidth: 320,
  },
});

class PatientTracker extends Component {
  state = {
    clickedRow: 0,
    input: "",
    ageRange: [0, 110],
    isMale: true,
    isFemale: true,
    hasIncompleteStations: true,
    completedAllStations: true,
  };

  reusableButton = (
    <IconButton
      onClick={() =>
        this.props.history.push(
          `/patient_tracker/screening_review/${this.state.clickedRow}`
        )
      }
    >
      <VisibilityOutlinedIcon />
    </IconButton>
  );

  //print data to excel
  handlePrint = () => {
    console.log("printed");
  };

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  };

  getPeople = () => {
    const people = [];
    for (let i = 1; i <= 10000; i++) {
      people[i - 1] = {
        edit: this.reusableButton,
        id: i,
        name: "Person " + ((i * 173) % 190),
        age: (i * 151) % 111,
        gender: i % 2 === 0 ? "F" : "M",
        oralHealth:
          i % 5 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        bmi:
          i % 7 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        eyeScreening:
          i % 6 === 0 ? "Completed" : i % 5 === 1 ? "In Queue" : "Not Queued",
      };
    }
    return people;
  };

  filterPeople = (people) => {
    const {
      input,
      ageRange,
      isMale,
      isFemale,
      hasIncompleteStations,
      completedAllStations,
    } = this.state;
    return this.getPeople()
      .filter(
        (person) =>
          person.name.indexOf(input) !== -1 ||
          person.id.toString().indexOf(input) !== -1
      )
      .filter((person) => {
        if (ageRange[0] > 100) {
          return person.age > 100;
        } else if (ageRange[1] > 100) {
          return person.age >= ageRange[0];
        } else {
          return person.age >= ageRange[0] && person.age <= ageRange[1];
        }
      })
      .filter((person) => {
        let m;
        let f;
        if (isMale) {
          m = person.gender === "M";
        }
        if (isFemale) {
          f = person.gender === "F";
        }
        return m || f;
      })
      .filter((person) => {
        let incomplete;
        let complete;
        if (hasIncompleteStations) {
          incomplete =
            person.station1 === "In Queue" ||
            person.station2 === "In Queue" ||
            person.station3 === "In Queue";
        }
        if (completedAllStations) {
          complete =
            person.station1 !== "In Queue" &&
            person.station2 !== "In Queue" &&
            person.station3 !== "In Queue";
        }
        return incomplete || complete;
      });
  };

  handleCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSlider = (event, newValue) => {
    this.setState({ ageRange: newValue });
  };

  resetFilter = () => {
    this.setState({
      ageRange: [0, 110],
      isMale: true,
      isFemale: true,
      hasIncompleteStations: true,
      completedAllStations: true,
    });
  };

  updateRow = (event) => {
    this.setState({
      clickedRow: event.rowData.id,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      ageRange,
      isMale,
      isFemale,
      hasIncompleteStations,
      completedAllStations,
    } = this.state;
    const people = this.filterPeople();
    return (
      <div>
        <h1>
          Patient Tracker{" "}
          <IconButton>
            <PrintIcon fontSize="large" />
          </IconButton>
        </h1>
        <TextField
          id="patient-tracker-search"
          label="Search Patient ID"
          variant="outlined"
          onChange={this.handleInput}
          style={{ width: 300, marginBottom: 20, marginRight: 20 }}
          autoComplete="off"
        />

        <div className={classes.container}>
          <div className={classes.root} style={{ zIndex: 2 }}>
            <Filter
              handleCheckbox={this.handleCheckbox}
              handleSlider={this.handleSlider}
              ageRange={ageRange}
              isMale={isMale}
              isFemale={isFemale}
              hasIncompleteStations={hasIncompleteStations}
              completedAllStations={completedAllStations}
              resetFilter={this.resetFilter}
            />
          </div>
        </div>

        <Typography variant="subtitle2" style={{ marginBottom: 5 }}>
          {people.length} results
        </Typography>

        <Paper style={{ height: 272, width: "100%" }}>
          <VirtualizedTable
            rowCount={people.length}
            rowGetter={({ index }) => people[index]}
            updateRow={this.updateRow}
            columns={[
              {
                width: 70,
                label: "Edit",
                dataKey: "edit",
              },
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
              },
              {
                width: 150,
                label: "Oral Health",
                dataKey: "oralHealth",
              },
              {
                width: 150,
                label: "BMI",
                dataKey: "bmi",
              },
              {
                width: 150,
                label: "Eye Screening",
                dataKey: "eyeScreening",
              },
            ]}
          />
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(PatientTracker));
