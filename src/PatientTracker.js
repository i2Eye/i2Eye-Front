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
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


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
    open:false
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

  edit = () => {
    const { clickedRow, open} = this.state;

      this.setState({open :true});
    }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };
  
    dialog = () => {
    const { clickedRow, open} = this.state;
    console.log(clickedRow)
 
    var a=this.getPeople().filter(
      (person) => person.id.toString()=== clickedRow.toString())
      console.log(a[0].oralHealth)
 

    return (

      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Patient ID: {a[0].id}</DialogTitle>
        <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingBottom: 20,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="name"
                    id="name"
                    label="Name"
                    onChange={this.handleChange}
                    defaultValue={a[0].name}
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      name="gender"
                      labelId="gender-label"
                      id="gender"
                      onChange={this.handleChange}
                      value={a[0].gender}
                    >
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"M"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="age"
                    id="age"
                    label="Age"
                    type="number"
                    onChange={this.handleChange}
                    defaultValue={a[0].age}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="OralHealth">OralHealth</InputLabel>
                    <Select
                      name="oralHealth"
                      id="oralHealth"
                      labelId="OralHealth"
                      onChange={this.handleChange}
                      defaultValue= {a[0].oralHealth}
                    >
                      <MenuItem value={"In Queue"}>In Queue</MenuItem>
                      <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="BMI">BMI</InputLabel>
                    <Select
                     name="bmi"
                     id="bmi"
                     labelId="BMI"
                     onChange={this.handleChange}
                     defaultValue={a[0].bmi}
                    >
                      <MenuItem value={"In Queue"}>In Queue</MenuItem>
                      <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="EyeScreening">EyeScreening</InputLabel>
                    <Select
                    name="eyeScreening"
                    id="eyeScreening"
                    labelId="EyeScreening"
                    onChange={this.handleChange}
                    defaultValue={a[0].eyeScreening}
                    >
                      <MenuItem value={"In Queue"}>In Queue</MenuItem>
                      <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </FormControl> 
                </Grid>
                </Grid>
            </Paper>
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      )
  }
  

 handleClose = () => {
    this.setState({open:false})
  };

  editButton = (
    <IconButton
      onClick={this.edit}
    >
      <EditIcon />
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
        edit: this.editButton,
        screen: this.reusableButton,
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
      completedAllStations, open,
    } = this.state;
    console.log(open)

    const people = this.filterPeople();
    return (
      <div>
        {this.state.open? this.dialog(): null}

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
                label: "Screen",
                dataKey: "screen",
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
