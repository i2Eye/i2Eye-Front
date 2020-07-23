import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import VirtualizedTable from "./Components/PatientTrackerComponents/VirtualizedTable";
import { withStyles } from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import clsx from "clsx";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "70%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

class PatientTracker extends Component {
  state = {
    input: "",
    checked1: true,
    checked2: true,
    checked3: true,
    checkedNotQueued: true,
    checkedInQueue: true,
    checkedCompleted: true,
  };

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
        station1:
          i % 5 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        station2:
          i % 7 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        station3:
          i % 6 === 0 ? "Completed" : i % 5 === 1 ? "In Queue" : "Not Queued",
      };
    }
    return people;
  };

  filterPeople = () =>
    this.getPeople()
      .filter(
        (person) =>
          person.name.indexOf(this.state.input) !== -1 ||
          person.id.toString().indexOf(this.state.input) !== -1
      )
      .filter((person) => {
        const {
          checked1,
          checked2,
          checked3,
          checkedNotQueued,
          checkedInQueue,
          checkedCompleted,
        } = this.state;
        let bol1;
        let bol2;
        let bol3;
        if (checked1) {
          if (person.station1 === "Not Queued") {
            bol1 = checkedNotQueued;
          } else if (person.station1 === "In Queue") {
            bol1 = checkedInQueue;
          } else if (person.station1 === "Completed") {
            bol1 = checkedCompleted;
          } else {
            console.log(person.name + " : unexpected status in station 1");
          }
        } else {
          bol1 = true;
        }
        if (checked2) {
          if (person.station2 === "Not Queued") {
            bol2 = checkedNotQueued;
          } else if (person.station2 === "In Queue") {
            bol2 = checkedInQueue;
          } else if (person.station2 === "Completed") {
            bol2 = checkedCompleted;
          } else {
            console.log(person.name + " : unexpected status in station 2");
          }
        } else {
          bol2 = true;
        }
        if (checked3) {
          if (person.station3 === "Not Queued") {
            bol3 = checkedNotQueued;
          } else if (person.station3 === "In Queue") {
            bol3 = checkedInQueue;
          } else if (person.station3 === "Completed") {
            bol3 = checkedCompleted;
          } else {
            console.log(person.name + " : unexpected status in station 3");
          }
        } else {
          bol3 = true;
        }
        return bol1 && bol2 && bol3;
      });

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>Patient Tracker</h1>
        <TextField
          id="patient-tracker-search"
          label="Search Patient ID"
          variant="outlined"
          onChange={this.handleInput}
          style={{ width: 300, marginBottom: 20, marginRight: 20 }}
        />

        <div className={classes.container}>
          <div className={classes.root} style={{ zIndex: 2 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Filter by Stations
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checked1}
                        onChange={this.handleChange}
                        name="checked1"
                      />
                    }
                    label="Station 1"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checked2}
                        onChange={this.handleChange}
                        name="checked2"
                      />
                    }
                    label="Station 2"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checked3}
                        onChange={this.handleChange}
                        name="checked3"
                      />
                    }
                    label="Station 3"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.root} style={{ zIndex: 1 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Filter by Status
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedNotQueued}
                        onChange={this.handleChange}
                        name="checkedNotQueued"
                      />
                    }
                    label="Not Queued"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedInQueue}
                        onChange={this.handleChange}
                        name="checkedInQueue"
                      />
                    }
                    label="In Queue"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedCompleted}
                        onChange={this.handleChange}
                        name="checkedCompleted"
                      />
                    }
                    label="Completed"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <Typography variant="subtitle2" style={{ marginBottom: 5 }}>
          {this.filterPeople().length} results
        </Typography>

        <Paper style={{ height: 272, width: "100%" }}>
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
              {
                width: 150,
                label: "Station 1",
                dataKey: "station1",
              },
              {
                width: 150,
                label: "Station 2",
                dataKey: "station2",
              },
              {
                width: 150,
                label: "Station 3",
                dataKey: "station3",
              },
            ]}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientTracker);
