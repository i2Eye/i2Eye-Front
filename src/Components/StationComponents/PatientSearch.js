import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = () => ({
  root: {
    maxWidth: 275,
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

class PatientSearch extends Component {
  state = {
    checked: true,
    input: "",
    patient: null,
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
    this.setState({ patient: v });
  };

  //Find a way to render an alert if there is no next person in the queue
  getNextPerson = () => {
    const availablePeople = this.getPeople().filter(
      (person) => person.available
    );
    availablePeople.length <= 0
      ? this.setState({ patient: null })
      : this.setState({ patient: availablePeople[0] });
  };

  getCard = (classes, person) => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`ID : ${person.id}`}
          </Typography>
          <Typography variant="body2" component="p">
            {`Name : ${person.name}`}
            <br />
            {`Age : ${person.age}`}
            <br />
            {`Gender : ${person.gender}`}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  render() {
    const { classes, previousStep, selectedStation } = this.props;
    const { checked, input, patient } = this.state;

    return (
      <div>
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
          disabled={!checked}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom: 20 }}
          onClick={this.getNextPerson}
          disabled={!checked}
        >
          Get Next Person
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={() => this.setState({ input: "", patient: null })}
          disabled={!checked || patient === null}
        >
          Cancel
        </Button>
        <br />
        {patient === null ? null : this.getCard(classes, patient)}

        <Button
          variant="contained"
          color="primary"
          onClick={previousStep}
          style={{
            marginRight: 20,
            marginTop: patient === null ? 145.563 : 20,
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={patient === null ? { marginTop: 145.563 } : { marginTop: 20 }}
          disabled={!checked || patient === null}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientSearch);
