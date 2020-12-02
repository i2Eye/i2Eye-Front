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
import { getAllPatients, updatePatientStatus } from "../../dbFunctions";

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
    people: [],
    next: false,
  };

  handleInput = (e, v, r) => {
    console.log(v)
    this.setState({ input: v, next: v === "" ? false : true });
  };

  handleMasterSearch = (e, v, r) => {
    const currPatient = this.state.patientID;
    this.setState({ patientID: v === null ? currPatient : v.id });
  };

  handleToggle = (e) => {
    this.setState({ toggle: e.target.checked });
  };

  handleCancel = () => {
    this.setState({ input: "", next: false });
  }

  //Find a way to render an alert if there is no next person in the queue
  getNextPerson = (stationName) => {
    const { people } = this.state;
    const currStation = this.getStationName(stationName)
    const availablePeople = people.filter((person) => person["Is Available"] && person[currStation] === "In Queue");
    availablePeople.length <= 0
      ? this.setState({ next: false })
      : this.setState({ patientID: availablePeople[0].id, next: true });
    this.setState({ input: "" });
  };

  getCard = (classes, patientID) => {
    const patient = this.state.people.find(
      (patient) => patient["id"] === patientID
    );

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`ID : ${patient["id"]}`}
          </Typography>
          <Typography variant="body2" component="p">
            {`Name : ${patient["Name"]}`}
            <br />
            {`Age : ${patient["Age"]}`}
            <br />
            {`Gender : ${patient["Gender"]}`}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  getWarning = (patientID) => {
    const { people, next } = this.state;
    const person = people.find((patient) => patient["id"] === patientID)
    if (
      next &&
      person !== undefined &&
      !person["Is Available"]
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

  componentDidMount() {
    getAllPatients().then((result) => this.setState({ people: result }));
  }

  render() {
    const { input, patientID, toggle, people, next } = this.state;
    const {
      classes,
      match: { params },
    } = this.props;

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
          options={people}
          getOptionLabel={(option) =>
            option["id"].toString() +
            " - " +
            option["Name"] +
            (!option["Is Available"] ? " (busy)" : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search Patient"
              fullWidth
            />
          )}
          inputValue={input}
          onInputChange={this.handleInput}
          onChange={this.handleMasterSearch}
          //Find a better getOptionSelected function
          getOptionSelected={(option, value) => option.id === value.id}
          disabled={!toggle}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom: 20 }}
          onClick={() => this.getNextPerson(params.stationName)}
          disabled={!toggle}
        >
          Get Next Person
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={this.handleCancel}
          disabled={!toggle || !next }
        >
          Cancel
        </Button>
        {this.getWarning(patientID)}
        <br />

        {!next || people.length <= 0
          ? null
          : this.getCard(classes, patientID)}

        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: 20,
            marginTop: !next || people.length <= 0 ? 145.563 : 20,
          }}
          component={Link}
          //onClick = {this.handleCancel}
          to="/stations"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: !next || people.length <= 0 ? 145.563 : 20,
          }}
          disabled={!toggle || !next }
          component={Link}
          onClick = {() => updatePatientStatus(patientID, false)}
          to={`/stations/${params.stationName}/${patientID}`}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientSearch);
