import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import VirtualizedTable from "./Components/PatientTrackerComponents/VirtualizedTable";
import { withStyles } from "@material-ui/core/styles";
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = (theme) => ({
  root: {
    width: '50%',
    marginBottom: 20
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});


class PatientTracker extends Component {
  state = { input: "" , checkedA: true};

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

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.checked });
  };

  render() {

    const {classes}= this.props;
    
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

      <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >

          <div className={classes.column}>
            <Typography className={classes.heading}>Filter by Stations</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="Station 1"
      />
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="Station 2"
      />
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="Station 3"
      />
      </FormGroup>
        </AccordionDetails>
      </Accordion>
   </div>

   <div className={classes.root}>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >

          <div className={classes.column}>
            <Typography className={classes.heading}>Filter by Status</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="Not Queued"
      />
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="In Queue"
      />
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
        label="Completed"
      />
      </FormGroup>
        </AccordionDetails>
      </Accordion>
      </div>
      


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

export default withStyles(useStyles)( PatientTracker);
