import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import getTestData from "../../TestData";
import { Link } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import Paper from "@material-ui/core/Paper";
import SaveWorker from "./save.worker";
import * as FileSaver from "file-saver";
import exportCSV from "./ExportCSV";
import jsPDF from "jspdf";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

var saveWorker;

const useStyles = (theme) => ({
  container: {
    height: 56,
    display: "inline-block",
    minWidth: 320,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
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
  editIcon: {
    height: 48,
    width: 48,
    margin: -12,
    alignSelf: "center",
    marginLeft: "auto",
  },
  anchor: {
    display: "block",
    position: "relative",
    top: -94,
    visibility: "hidden",
  },
});

class Screening extends Component {
  state = {
    disable: true,
    printOpen: 0,
    fileName: "",
    id: this.props.match.params.patientID,
    saveError: false,
    detailOpen: {
      registration: false,
      oralHealth: false,
      bmi: false,
      eyeScreening: false,
      phlebotomy: false,
      fingerstickAnemia: false,
      fingerstickRCBG: false,
      doctorsConsult: false,
    },
    stationNav: "",
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
    const { id } = this.state;
    const name =
      "PatientID_" +
      id +
      "_Full_Information_" +
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

  handleIndivPDF = () => {
    const { fileName } = this.state;
    if (window.Worker) {
      saveWorker = new SaveWorker();
      const { id } = this.state;
      saveWorker.postMessage({ message: "save individual pdf", id: id });

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
              fileType === "excel"
                ? this.handleIndivExcel()
                : this.handleIndivPDF();
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

  handleIndivExcel = () => {
    const { fileName } = this.state;
    if (window.Worker) {
      saveWorker = new SaveWorker();
      saveWorker.postMessage({
        message: "save individual excel",
        id: this.state.id,
      });
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

  handleClick = (station) => {
    const newDetailOpen = {
      registration: false,
      oralHealth: false,
      bmi: false,
      eyeScreening: false,
      phlebotomy: false,
      fingerstickAnemia: false,
      fingerstickRCBG: false,
      doctorsConsult: false,
    };

    newDetailOpen[station] = !this.state.detailOpen[station];
    this.setState({ detailOpen: newDetailOpen });
  };

  handleNavClick = (station) => {
    const newDetailOpen = {
      registration: false,
      oralHealth: false,
      bmi: false,
      eyeScreening: false,
      phlebotomy: false,
      fingerstickAnemia: false,
      fingerstickRCBG: false,
      doctorsConsult: false,
    };

    newDetailOpen[station] = true;
    this.setState({ detailOpen: newDetailOpen, stationNav: station });
  };

  render() {
    const {
      classes,
      match: { params },
    } = this.props;

    const { detailOpen, stationNav } = this.state;

    const data = getTestData(params.patientID);

    const stations = [
      {
        label: "Registration Details",
        name: "registration",
      },
      {
        label: "Oral Health",
        name: "oralHealth",
      },
      {
        label: "BMI & Abdominal Obesity",
        name: "bmi",
      },
      {
        label: "Eye Screening",
        name: "eyeScreening",
      },
      {
        label: "Phlebotomy Test",
        name: "phlebotomy",
      },
      {
        label: "Fingerstick Blood Test (Anemia)",
        name: "fingerstickAnemia",
      },
      {
        label: "Fingerstick Blood Test (RCBG)",
        name: "fingerstickRCBG",
      },
      {
        label: "Doctor's Consult",
        name: "doctorsConsult",
      },
    ];

    return (
      <React.Fragment>
        {this.printDialog()}

        <div className="container">
          <h1 style={{ display: "inline-block" }}>
            Screening Review {/* <Link to={params.patientID}> */}
            <Tooltip title="Download">
              <IconButton onClick={() => this.setState({ printOpen: 1 })}>
                <GetAppIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </h1>
          <Typography
            variant="h6"
            style={{ float: "right", display: "inline-block" }}
          >
            ID: {params.patientID}
          </Typography>
        </div>

        {/* I think for the editing we can reuse the station forms */}

        <Grid container spacing={3}>
          <Grid item xs={8}>
            {stations.map((station) => {
              return (
                <Accordion
                  key={station.name}
                  expanded={detailOpen[station.name]}
                  TransitionProps={{
                    onEntered: () => {
                      window.location.href = `${params.patientID}#${station.name}`;
                    },
                    onExited: () => {
                      window.location.href = `${params.patientID}#${stationNav}`;
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={station.name + "-content"}
                    name={station.name}
                    id={station.name + "-summary"}
                    onClick={() => this.handleClick(station.name)}
                  >
                    <a className={classes.anchor} id={station.name}></a>

                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        {station.label}
                      </Typography>
                    </div>
                    <div className={classes.editIcon}>
                      <Link
                        to={
                          station.name === "registration"
                            ? `/registration/edit/${params.patientID}`
                            : `/stations/${station.name}/${params.patientID}`
                        }
                      >
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    className={classes.details}
                    id={station.name + "-details"}
                  >
                    <Grid container spacing={3}>
                      {data[station.name].map((question) => {
                        return (
                          <Grid item xs={12} md={6} key={question.num}>
                            <Typography variant="subtitle2">
                              {question.num}. {question.question}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {question.answer === ""
                                ? "NIL"
                                : Array.isArray(question.answer)
                                ? question.answer.toString().replace(/,/g, ", ")
                                : question.answer}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Grid>

          <Grid item xs={4}>
            <Paper style={{ position: "sticky", top: 74 }}>
              <List component="nav" aria-label="screening-navigation">
                {stations.map((station) => (
                  <ListItem
                    button
                    onClick={() => this.handleNavClick(station.name)}
                    key={station.name}
                    /*                     href={"#" + station.name}
                    component="a" */
                  >
                    <Typography variant="body2">{station.label}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          component={Link}
          to="/patient_tracker"
        >
          Back
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Screening);
