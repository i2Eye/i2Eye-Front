import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";

const useStyles = (theme) => ({
  root: {
    maxWidth: 275,
  },
  rootList: {
    width: "100%",
    maxWidth: 360,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const StyledSwitch = withStyles({
  root: { verticalAlign: "baseline", marginLeft: 20 },
})(Switch);

class PatientSearch extends Component {
  state = {
    input: "",
    patientID: 0,
  };

  //Replace with function to retrieve list of people when backend team is done
  getPeople() {
    return [
      { id: 1, name: "Person 1", age: 10, gender: "M", available: false },
      { id: 2, name: "Person 2", age: 20, gender: "F", available: true },
      { id: 3, name: "Person 3", age: 30, gender: "M", available: true },
    ];
  }

  handleInput = (e, v, r) => {
    this.setState({ input: v });
  };

  handleMasterSearch = (e, v, r) => {
    this.setState({ patientID: v === null ? 0 : v.id });
  };

  //Find a way to render an alert if there is no next person in the queue
  getNextPerson = () => {
    const people = this.getPeople();
    const availablePeople = people.filter((person) => person.available);
    availablePeople.length <= 0
      ? this.setState({ patientID: 0 })
      : this.setState({ patientID: availablePeople[0].id });
    this.setState({ input: "" });
  };

  getCard = (classes, patientID) => {
    const patient = this.getPeople().find(
      (patient) => patient.id === patientID
    );
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`ID : ${patient.id}`}
          </Typography>
          <Typography variant="body2" component="p">
            {`Name : ${patient.name}`}
            <br />
            {`Age : ${patient.age}`}
            <br />
            {`Gender : ${patient.gender}`}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  getWarning = (patientID) => {
    if (
      patientID > 0 &&
      !this.getPeople().find((patient) => patient.id === patientID).available
    ) {
      return (
        <Typography variant="subtitle1" color="error">
          Warning: This person is currently engaged in another station
        </Typography>
      );
    }
  };

  render() {
    const { classes, station, previousStep, handleToggle } = this.props;
    const { input, patientID } = this.state;
    return (
      <div>
        <div>
          <h1 style={{ display: "inline-block" }}>{station.name}</h1>
          <StyledSwitch
            onChange={handleToggle}
            checked={station.checked}
            inputProps={{ "aria-labelledby": "switch-list-label-1" }}
          />
        </div>

        <Autocomplete
          id="patient-master-search"
          autoHighlight
          options={this.getPeople()}
          getOptionLabel={(option) =>
            option.id.toString() +
            " - " +
            option.name +
            (!option.available ? " (busy)" : "")
          }
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Patient ID"
              variant="outlined"
            />
          )}
          onInputChange={this.handleInput}
          inputValue={input}
          onChange={this.handleMasterSearch}
          //Find a better getOptionSelected function
          getOptionSelected={(option, value) => option.id === value.id}
          disabled={!station.checked}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom: 20 }}
          onClick={this.getNextPerson}
          disabled={!station.checked}
        >
          Get Next Person
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={() => this.setState({ input: "", patientID: 0 })}
          disabled={!station.checked || patientID <= 0}
        >
          Cancel
        </Button>
        {this.getWarning(patientID)}
        <br />

        {patientID <= 0 ? null : this.getCard(classes, patientID)}

        <Button
          variant="contained"
          color="primary"
          onClick={previousStep}
          style={{
            marginRight: 20,
            marginTop: patientID <= 0 ? 145.563 : 20,
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={patientID <= 0 ? { marginTop: 145.563 } : { marginTop: 20 }}
          disabled={!station.checked || patientID <= 0}
          component={Link}
          to={`/stations/${station.tag}/${patientID}`}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientSearch);
