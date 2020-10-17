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
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import GetAppIcon from "@material-ui/icons/GetApp";
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
import getTestData from "./TestData";
import SaveWorker from "./Components/PatientTrackerComponents/save.worker";
import * as FileSaver from "file-saver";
import exportCSV from "./Components/PatientTrackerComponents/ExportCSV";
import jsPDF from "jspdf";
import { getAllPatients, updatePatientData, updateCompletedStations } from "./dbFunctions";

var saveWorker;

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
    editOpen: false,
    printOpen: 0,
    fileName: "",
    saveError: false,
    people: [],
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

  handleEdit = (e, patientData) => {
    const name = e.target.name
    const value = e.target.value
    patientData[name] = value
  }
  

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
    const { fileName } = this.state;
    if (window.Worker) {
      saveWorker = new SaveWorker();
      saveWorker.postMessage({ message: "save pdf" });
      this.setState({ printOpen: 5 });
      saveWorker.addEventListener("message", (event) => {
        FileSaver.saveAs(event.data, fileName + ".pdf");
        this.handlePrintClose();
        saveWorker = null;
      });
    } else {
      var doc = new jsPDF({ orientation: "l", unit: "cm", format: "a4" });
      doc.text("test", 1, 1);

      doc.save(fileName);
    }
  };

  getSaveDialog = (fileType) => {
    const { printOpen, fileName } = this.state;
    return (
      <Dialog
        open={printOpen > 0}
        onClose={this.handlePrintClose}
        aria-labelledby="print-dialog-title"
      >
        <DialogTitle id="print-dialog-title">
          Save {fileType === "excel" ? "Excel" : "PDF"}
        </DialogTitle>
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
            style={{ marginRight: "auto" }}
            onClick={() => {
              this.setState({ printOpen: 1 });
            }}
            color="primary"
          >
            Back
          </Button>
          <Button
            disabled={fileName === "" || fileName.indexOf(":") >= 0}
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
            onClick={fileType === "excel" ? this.cancelExcel : this.cancelPDF}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  cancelExcel = () => {
    if (saveWorker !== null) {
      saveWorker.terminate();
      saveWorker = null;
      //console.log("save cancelled");
    }
    this.setState({ printOpen: 2 });
  };

  cancelPDF = () => {
    if (saveWorker !== null) {
      saveWorker.terminate();
      saveWorker = null;
      //console.log("save cancelled");
    }
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
        return this.getLoadingDialog("excel");
      case 5:
        return this.getLoadingDialog("pdf");
      default:
        return 0;
    }
  };

  editDialog = () => {
    const { clickedRow, editOpen, people } = this.state;
    //console.log(clickedRow);

    const patientData = people.find(
      (person) => person.id.toString() === clickedRow.toString()
    );
    //console.log(patientData["Oral Health"]);

    return (
      <Dialog
        open={editOpen}
        onClose={() => this.handleClose(patientData)}
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
                  <Grid item xs={12}>
                    <TextField
                      name="Name"
                      id="Name"
                      label="Name"
                      onChange={(e) => this.handleEdit(e, patientData)}
                      defaultValue={patientData["Name"]}
                      autoComplete="off"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        name="Gender"
                        labelId="gender-label"
                        id="Gender"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Gender"]}
                      >
                        <MenuItem value={"F"}>Female</MenuItem>
                        <MenuItem value={"M"}>Male</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="Age"
                      id="Age"
                      label="Age"
                      type="number"
                      onChange={(e) => this.handleEdit(e, patientData)}
                      defaultValue={patientData["Age"]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Oral Health">Oral Health</InputLabel>
                      <Select
                        name="Oral Health"
                        id="Oral Health"
                        labelId="Oral Health"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Oral Health"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="BMI">BMI</InputLabel>
                      <Select
                        name="BMI"
                        id="BMI"
                        labelId="BMI"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData.BMI}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Eye Screening">Eye Screening</InputLabel>
                      <Select
                        name="Eye Screening"
                        id="Eye Screening"
                        labelId="Eye Screening"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Eye Screening"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Phlebotomy Test">
                        Phlebotomy Test
                      </InputLabel>
                      <Select
                        name="Phlebotomy Test"
                        id="Phlebotomy Test"
                        labelId="Phlebotomy Test"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Phlebotomy Test"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Fingerstick Anemia">
                        Fingerstick Anemia
                      </InputLabel>
                      <Select
                        name="Fingerstick Blood Test (Anemia)"
                        id="Fingerstick Blood Test (Anemia)"
                        labelId="Fingerstick Anemia"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Fingerstick Blood Test (Anemia)"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Fingerstick RCBG">
                        Fingerstick RCBG
                      </InputLabel>
                      <Select
                        name="Fingerstick Blood Test (RCBG)"
                        id="Fingerstick Blood Test (RCBG)"
                        labelId="Fingerstick RCBG"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Fingerstick Blood Test (RCBG)"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Blood Pressure">
                        Blood Pressure
                      </InputLabel>
                      <Select
                        name="Blood Pressure"
                        id="Blood Pressure"
                        labelId="Blood Pressure"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Blood Pressure"]}
                      >
                        <MenuItem value={"In Queue"}>In Queue</MenuItem>
                        <MenuItem value={"Not Queued"}>Not Queued</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Doctor's Consult">
                        Doctor's Consult
                      </InputLabel>
                      <Select
                        name="Doctor's Consult"
                        id="Doctor's Consult"
                        labelId="Doctor's Consult"
                        onChange={(e) => this.handleEdit(e, patientData)}
                        defaultValue={patientData["Doctor's Consult"]}
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
          <Button onClick={() => this.handleClose(patientData)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  handleClose = (patient) => {
    const data = [
      {"num": 1,
       "question": "Name"},
      {"num": 3,
       "question": "Gender"},
      {"num": 5,
       "question": "Age"}
    ]
    for (const field in data) {
      data[field]["answers"] = patient[data[field]["question"]]
    }
    updatePatientData(patient.id, {"Registration": data})

    const stations = ["Registratoin", "BMI", "Oral Health", "Phlebotomy Test", "Eye Screening", "Fingerstick Blood Test (Anemia)", 
                      "Fingerstick Blood Test (RCBG)", "Blood Pressure", "Doctor's Consult"]
    const station_completion = {}
    for (const field in patient) {
      if (stations.indexOf(field) >= 0) {
        station_completion[field] = patient[field]
      }
    }
    updateCompletedStations(patient.id, station_completion)
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
      saveWorker = new SaveWorker();
      saveWorker.postMessage({ message: "save excel" });
      this.setState({ printOpen: 4 });
      saveWorker.addEventListener("message", (event) => {
        FileSaver.saveAs(event.data, fileName);
        this.handlePrintClose();
        saveWorker = null;
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
    const peoplePromise = getAllPatients();
    peoplePromise.then((result) =>
      this.setState({
        people: result.map((person) => ({
          actions: (
            <React.Fragment>
              {this.editButton}
              {this.seeMoreButton}
            </React.Fragment>
          ),
          id: person["id"],
          "Name": person["Name"],
          "Age": person["Age"],
          "Gender": person["Gender"],
          "Oral Health": person["Oral Health"],
          "BMI": person["BMI"],
          "Eye Screening": person["Eye Screening"],
          "Phlebotomy Test": person["Phlebotomy Test"],
          "Fingerstick Blood Test (Anemia)": person["Fingerstick Blood Test (Anemia)"],
          "Fingerstick Blood Test (RCBG)": person["Fingerstick Blood Test (RCBG)"],
          "Blood Pressure": person["Blood Pressure"],
          "Doctor's Consult": person["Doctor's Consult"],
        })),
      })
    );
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
          person["Name"].toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
          person.id.toString().indexOf(input) !== -1
      )
      .filter((person) => {
        if (ageRange[0] > 100) {
          return person["Age"] > 100;
        } else if (ageRange[1] > 100) {
          return person["Age"] >= ageRange[0];
        } else {
          return person["Age"] >= ageRange[0] && person["Age"] <= ageRange[1];
        }
      })
      .filter((person) => {
        let m = false;
        let f = false;
        if (isMale) {
          m = person["Gender"] === "M";
        }
        if (isFemale) {
          f = person["Gender"] === "F";
        }
        return m || f;
      })
      .filter((person) => {
        let incomplete = false;
        let complete = false;
        if (hasIncompleteStations) {
          incomplete =
            person["Oral Health"] === "In Queue" ||
            person.BMI === "In Queue" ||
            person["Eye Screening"] === "In Queue";
        }
        if (completedAllStations) {
          complete =
            person["Oral Health"] !== "In Queue" &&
            person.BMI !== "In Queue" &&
            person["Eye Screening"] !== "In Queue";
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

  getColumns = (people) => {
    const columns = [
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
        width: 230,
        label: "Name",
        dataKey: "Name",
      },
      {
        width: 70,
        label: "Age",
        dataKey: "Age",
        numeric: true,
      },
      {
        width: 120,
        label: "Gender",
        dataKey: "Gender",
      },
      {
        width: 150,
        label: "Oral Health",
        dataKey: "Oral Health",
      },
      {
        width: 150,
        label: "BMI",
        dataKey: "BMI",
      },
      {
        width: 150,
        label: "Eye Screening",
        dataKey: "Eye Screening",
      },
      {
        width: 150,
        label: "Phlebotomy Test",
        dataKey: "Phlebotomy Test",
      },
      {
        width: 150,
        label: "Fingerstick Anemia",
        dataKey: "Fingerstick Blood Test (Anemia)",
      },
      {
        width: 150,
        label: "Fingerstick RCBG",
        dataKey: "Fingerstick Blood Test (RCBG)",
      },
      {
        width: 150,
        label: "Blood Pressure",
        dataKey: "Blood Pressure",
      },
      {
        width: 150,
        label: "Doctor's Consult",
        dataKey: "Doctor's Consult",
      },
    ];

    const getStationSummary = (dataKey) => (
      <React.Fragment>
        <p>Station Summary:</p>
        <p>
          {"Total no. of people registered: " +
            people.filter(
              (person) =>
                person[dataKey] === "In Queue" ||
                person[dataKey] === "Completed"
            ).length}
        </p>
        <p>
          {"No. of people in queue: " +
            people.filter((person) => person[dataKey] === "In Queue").length}
        </p>
        <p>
          {"No. of people in queue: " +
            people.filter((person) => person[dataKey] === "Completed").length}
        </p>
      </React.Fragment>
    );

    for (let i = 5; i < columns.length; i++) {
      columns[i].label = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ display: "inline" }}>{columns[i].label}</p>
          <Tooltip
            title={getStationSummary(columns[i].dataKey)}
            placement="top"
          >
            <InfoIcon
              color="disabled"
              style={{ marginLeft: 7, fontSize: 11 }}
            />
          </Tooltip>
        </div>
      );
    }
    return columns;
  };

  componentDidMount() {
    this.getPeople();
  }

  render() {
    const { classes } = this.props;
    const {
      ageRange,
      isMale,
      isFemale,
      hasIncompleteStations,
      completedAllStations,
      people,
    } = this.state;
    //console.log(editOpen);

    const filteredPeople = this.filterPeople(people);
    return (
      <div>
        {this.state.editOpen ? this.editDialog() : null}
        {this.printDialog()}

        <h1>
          Patient Tracker{" "}
          <Tooltip title="Download">
            <IconButton onClick={() => this.setState({ printOpen: 1 })}>
              <GetAppIcon fontSize="large" />
            </IconButton>
          </Tooltip>
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
              columns={this.getColumns(filteredPeople)}
            />
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(PatientTracker));
