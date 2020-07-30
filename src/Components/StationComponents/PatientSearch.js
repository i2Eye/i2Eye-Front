import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
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

const getPatientID = (id) => (isNaN(Number(id)) ? 0 : Number(id));

class PatientSearch extends Component {
  state = {
    input: "",
    patientID: getPatientID(this.props.match.params.patientID),
    toggle: true,
  };

  //Replace with function to retrieve list of people when backend team is done
  getPeople = () => {
    const people = [];
    for (let i = 1; i <= 10000; i++) {
      people[i - 1] = {
        id: i,
        name: "Person " + ((i * 173) % 190),
        available: Math.floor(i * 26.4) % 11 !== 2,
        age: (i * 151) % 111,
        gender: i % 2 === 0 ? "F" : "M",
      };
    }
    return people;
  };

  handleInput = (e, v, r) => {
    this.setState({ input: v });
  };

  handleMasterSearch = (e, v, r) => {
    this.setState({ patientID: v === null ? 0 : v.id });
  };

  handleToggle = (e) => {
    this.setState({ toggle: e.target.checked });
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

  getStationName = (stationTag) => {
    const stations = [
      { name: "Oral Health", tag: "oralHealth" },
      { name: "BMI and Abdominal Obesity", tag: "bmi" },
      { name: "Eye Screening", tag: "eyeScreening" },
      { name: "Phlebotomy Test", tag: "phlebotomy" },
      { name: "Fingerstick Blood Test", tag: "fingerstickAnemia" },
      { name: "Doctor Consult", tag: "doctorConsult" },
      { name: "Fingerstick Test (RCBG)", tag: "fingerstickRCBG" },
      { name: "Blood Pressure Test", tag: "bloodPressure" },
    ];
    return stations.find((station) => station.tag === stationTag).name;
  };

  render() {
    const { input, patientID, toggle } = this.state;
    const {
      classes,
      match: { params },
    } = this.props;

    console.log(patientID);

    return (
      <div>
        <div>
          <h1 style={{ display: "inline-block" }}>
            {this.getStationName(params.stationName)}
          </h1>
          <StyledSwitch
            onChange={this.handleToggle}
            checked={toggle}
            inputProps={{ "aria-labelledby": "switch-list-label-1" }}
          />
        </div>

        <VirtualizedAutocomplete
          id="patient-master-search"
          options={this.getPeople()}
          getOptionLabel={(option) =>
            option.id.toString() +
            " - " +
            option.name +
            (!option.available ? " (busy)" : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search Patient"
              fullWidth
            />
          )}
          onInputChange={this.handleInput}
          inputValue={input}
          onChange={this.handleMasterSearch}
          //Find a better getOptionSelected function
          getOptionSelected={(option, value) => option.id === value.id}
          disabled={!toggle}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom: 20 }}
          onClick={this.getNextPerson}
          disabled={!toggle}
        >
          Get Next Person
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={() => this.setState({ input: "", patientID: 0 })}
          disabled={!toggle || patientID <= 0}
        >
          Cancel
        </Button>
        {this.getWarning(patientID)}
        <br />

        {patientID <= 0 ? null : this.getCard(classes, patientID)}

        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: 20,
            marginTop: patientID <= 0 ? 145.563 : 20,
          }}
          component={Link}
          to="/stations"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={patientID <= 0 ? { marginTop: 145.563 } : { marginTop: 20 }}
          disabled={!toggle || patientID <= 0}
          component={Link}
          to={`/stations/${params.stationName}/${patientID}`}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientSearch);
