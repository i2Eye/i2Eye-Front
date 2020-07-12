import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
    swtich: true,
    input: "",
    station: [
      { id: 1, available: false },
      { id: 2, available: true },
      { id: 3, available: true },
    ],
    selected: null,
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
    this.setState({ selected: v });
  };

  //Find a way to render an alert if there is no next person in the queue
  getNextPerson = () => {
    const availablePeople = this.getPeople().filter(
      (person) => person.available
    );
    availablePeople.length <= 0
      ? this.setState({ selected: null })
      : this.setState({ selected: availablePeople[0] });    


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
    const { classes } = this.props;

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
          /* The search is actually a master search so that the person can put whatever patient they want next. (It's probably used in the case
          something happends and we need to overwrite the queue manually :/// ) */

          //getOptionDisabled={(option) => !option.available}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Patient ID"
              variant="outlined"
            />
          )}
          onInputChange={this.handleInput}
          inputValue={this.state.input}
          onChange={this.handleMasterSearch}
          //Find a better getOptionSelected function
          getOptionSelected={(option, value) => option.id === value.id}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20, marginBottom: 20 }}
          onClick={this.getNextPerson}
          disabled={this.state.selected !== null}
        >
          Get Next Person
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={() => this.setState({ input: "", selected: null })}
          disabled={this.state.selected === null}
        >
          Cancel
        </Button>

        {this.state.selected === null
          ? null
          : this.getCard(classes, this.state.selected)}
        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          disabled={this.state.selected === null}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(PatientSearch);
