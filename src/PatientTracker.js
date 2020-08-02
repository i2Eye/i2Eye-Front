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
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import getTestData from "./TestData";
import Worker from "./Components/PatientTrackerComponents/excel.worker";
import * as FileSaver from "file-saver";
import exportCSV from "./Components/PatientTrackerComponents/ExportCSV";

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

var excelWorker;

class PatientTracker extends Component {
  state = {
    clickedRow: 0,
    input: "",
    ageRange: [0, 110],
    isMale: true,
    isFemale: true,
    hasIncompleteStations: true,
    completedAllStations: true,
    editOpen: false,
    printOpen: 0,
    fileName: "",
    saveError: false,
  };

  seeMoreButton = (
    <Tooltip title="See more">
      <IconButton
        onClick={() =>
          this.props.history.push(
            `/patient_tracker/screening_review/${this.state.clickedRow}`
          )
        }
      >
        <VisibilityOutlinedIcon />
      </IconButton>
    </Tooltip>
  );

  edit = () => {
    this.setState({ editOpen: true });
  };

  handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleOpenSave = (x) => {
    var today = new Date();
    const name =
      "Overall_Information_List_" +
      today.getFullYear() +
      "-" +
      (today.getMonth() < 9 ? 0 : "") +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? 0 : "") +
      today.getDate() +
      "_" +
      (today.getHours() < 10 ? 0 : "") +
      today.getHours() +
      (today.getMinutes() < 10 ? 0 : "") +
      today.getMinutes() +
      (today.getSeconds() < 10 ? 0 : "") +
      today.getSeconds();

    this.setState({ fileName: name, printOpen: x });
  };

  handlePrintClose = () => {
    this.setState({ printOpen: 0 });
  };

  handlePDF = () => {
    console.log("PDF");
  };

  getSaveDialog = (fileType) => {
    const { printOpen, fileName } = this.state;
    return (
      <Dialog
        open={printOpen > 0}
        onClose={this.handlePrintClose}
        aria-labelledby="print-dialog-title"
      >
        <DialogTitle id="print-dialog-title">Save as</DialogTitle>
        <DialogContent>
          <TextField
            id="excel-save-file-name"
            name="fileName"
            label="Enter File Name"
            variant="outlined"
            required
            onChange={this.handleChange}
            style={{ width: 300 }}
            autoComplete="off"
            defaultValue={fileName}
            error={fileName === "" || fileName.indexOf(":") >= 0}
            helperText={
              fileName === ""
                ? "File name cannot be blank"
                : fileName.indexOf(":") >= 0
                ? "File name cannot contain ':'"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={fileName === ""}
            onClick={() => {
              fileType === "excel" ? this.handleExcel() : this.handlePDF();
            }}
            color="primary"
          >
            Save
          </Button>
          <Button onClick={this.handlePrintClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  getLoadingDialog = (fileType) => {
    const { printOpen } = this.state;
    return (
      <Dialog open={printOpen > 0} aria-labelledby="print-dialog-title">
        <DialogTitle id="print-dialog-title">Loading</DialogTitle>
        <DialogContent>
          <div
            style={{
              width: 300,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(fileType = "excel" ? this.cancelExcel : this.cancelPDF)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  cancelExcel = () => {
    if (excelWorker !== null) {
      excelWorker.terminate();
      excelWorker = null;
      //console.log("save cancelled");
    }
    this.setState({ printOpen: 2 });
  };

  cancelPDF = () => {
    this.setState({ printOpen: 3 });
  };

  printDialog = () => {
    const { printOpen } = this.state;

    switch (printOpen) {
      case 0:
        return null;

      case 1:
        return (
          <Dialog
            open={printOpen > 0}
            onClose={this.handlePrintClose}
            aria-labelledby="print-dialog-title"
          >
            <DialogTitle id="print-dialog-title">Save as</DialogTitle>
            <DialogContent style={{ overflowY: "visible" }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    onClick={() => this.handleOpenSave(3)}
                    color="primary"
                  >
                    PDF
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => this.handleOpenSave(2)}
                    color="primary"
                  >
                    Excel
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handlePrintClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        );

      case 2:
        return this.getSaveDialog("excel");
      case 3:
        return this.getSaveDialog("pdf");
      case 4:
        return this.getLoadingDialog();
      default:
        return 0;
    }
  };

  editDialog = () => {
    const { clickedRow, editOpen } = this.state;
    //console.log(clickedRow);

    const patientData = this.getPeople().find(
      (person) => person.id.toString() === clickedRow.toString()
    );
    //console.log(patientData.oralHealth);

    return (
      <Dialog
        open={editOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Patient ID: {patientData.id}
        </DialogTitle>
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
                      defaultValue={patientData.name}
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
                        value={patientData.gender}
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
                      defaultValue={patientData.age}
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
                        defaultValue={patientData.oralHealth}
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
                        defaultValue={patientData.bmi}
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
                        defaultValue={patientData.eyeScreening}
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
    );
  };

  handleClose = () => {
    this.setState({ editOpen: false });
  };

  editButton = (
    <Tooltip title="Edit">
      <IconButton onClick={this.edit}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  //print data to excel
  handleExcel = () => {
    const { fileName } = this.state;
    if (window.Worker) {
      excelWorker = new Worker();
      excelWorker.postMessage("start save:" + this.state.fileName);
      this.setState({ printOpen: 4 });
      excelWorker.addEventListener("message", (event) => {
        FileSaver.saveAs(event.data, fileName);
        this.handlePrintClose();
      });
    } else {
      const csvData = [];
      for (let i = 1; i <= 10000; i++) {
        csvData[i - 1] = getTestData(i);
      }
      FileSaver.saveAs(exportCSV(csvData), fileName);
    }
  };

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  };

  getPeople = () => {
    const people = [];
    for (let i = 1; i <= 10000; i++) {
      people[i - 1] = {
        actions: (
          <React.Fragment>
            {this.editButton}
            {this.seeMoreButton}
          </React.Fragment>
        ),
        id: i,
        name: "Person " + ((i * 173) % 190),
        age: (i * 151) % 111,
        gender: i % 2 === 0 ? "F" : "M",
        oralHealth:
          i % 5 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        bmi:
          i % 7 === 0 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        eyeScreening:
          i % 6 === 0 ? "Completed" : i % 5 === 0 ? "In Queue" : "Not Queued",
        phlebotomy:
          i % 4 === 0 ? "Completed" : i % 2 === 1 ? "In Queue" : "Not Queued",
        fingerstickAnemia:
          i % 5 === 2 ? "Completed" : i % 5 === 1 ? "In Queue" : "Not Queued",
        fingerstickRCBG:
          i % 6 === 3 ? "Completed" : i % 5 === 2 ? "In Queue" : "Not Queued",
        bloodPressure:
          i % 7 === 2 ? "Completed" : i % 3 === 1 ? "In Queue" : "Not Queued",
        doctorConsult:
          i % 6 === 5 ? "Completed" : i % 2 === 1 ? "In Queue" : "Not Queued",
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
    return people
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
        let m = false;
        let f = false;
        if (isMale) {
          m = person.gender === "M";
        }
        if (isFemale) {
          f = person.gender === "F";
        }
        return m || f;
      })
      .filter((person) => {
        let incomplete = false;
        let complete = false;
        if (hasIncompleteStations) {
          incomplete =
            person.oralHealth === "In Queue" ||
            person.bmi === "In Queue" ||
            person.eyeScreening === "In Queue";
        }
        if (completedAllStations) {
          complete =
            person.oralHealth !== "In Queue" &&
            person.bmi !== "In Queue" &&
            person.eyeScreening !== "In Queue";
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
    //console.log(editOpen);

    const people = this.getPeople();
    const filteredPeople = this.filterPeople(people);
    return (
      <div>
        {this.state.editOpen ? this.editDialog() : null}
        {this.printDialog()}

        <h1>
          Patient Tracker{" "}
          <IconButton onClick={() => this.setState({ printOpen: 1 })}>
            <PrintIcon fontSize="large" />
          </IconButton>
        </h1>
        <TextField
          id="patient-tracker-search"
          label="Search Patient"
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
          {filteredPeople.length} results
        </Typography>

        <Paper style={{ maxWidth: "100%", overflowX: "scroll" }}>
          <Paper style={{ height: 250, width: 1830 }}>
            <VirtualizedTable
              rowCount={filteredPeople.length}
              rowGetter={({ index }) => filteredPeople[index]}
              updateRow={this.updateRow}
              overscanRowCount={10}
              columns={[
                {
                  width: 120,
                  label: "Actions",
                  dataKey: "actions",
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
                {
                  width: 150,
                  label: "Phlebotomy Test",
                  dataKey: "phlebotomy",
                },
                {
                  width: 150,
                  label: "Fingerstick Anemia",
                  dataKey: "fingerstickAnemia",
                },
                {
                  width: 150,
                  label: "Fingerstick RCBG",
                  dataKey: "fingerstickRCBG",
                },
                {
                  width: 150,
                  label: "Blood Pressure",
                  dataKey: "bloodPressure",
                },
                {
                  width: 150,
                  label: "Doctor's Consult",
                  dataKey: "doctorConsult",
                },
              ]}
            />
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(PatientTracker));
