import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import getTestData from "../../TestData";
import { Link } from "react-router-dom";
import PrintIcon from "@material-ui/icons/Print";

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
  parentContainer: {
    height: 24,
    width: 24,
    position: "relative",
    flexBasis: "100%",
  },
  childIcon: {
    position: "absolute",
    right: "0%",
    top: "-50%",
  },
});

class Screening extends Component {
  state = { disable: true };

  render() {
    const {
      classes,
      match: { params },
    } = this.props;

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
    ];

    return (
      <React.Fragment>
        <div className="container">
          <h1 style={{ display: "inline-block" }}>
            Screening Review{" "}
            <Link to={params.patientID}>
              <IconButton>
                <PrintIcon fontSize="large" />
              </IconButton>
            </Link>
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
                <Accordion key={station.name}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={station.name + "-content"}
                    id={station.name}
                  >
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        {station.label}
                      </Typography>
                    </div>
                    <div className={classes.parentContainer}>
                      <Link
                        to={
                          station.name === "registration"
                            ? `/registration/edit/${params.patientID}`
                            : `/stations/${station.name}/${params.patientID}`
                        }
                      >
                        <IconButton className={classes.childIcon}>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <Grid container spacing={3}>
                      {data[station.name].map((question) => {
                        return (
                          <Grid item xs={12} md={6} key={question.num}>
                            <Typography variant="subtitle2">
                              {question.num}. {question.question}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {question.answer === "" ? "NIL" : question.answer}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}

            {/*             <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Registration Details
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="name"
                      id="name"
                      label="Name"
                      disabled={this.state.disable}
                      autoComplete="off"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="nric"
                      id="nric"
                      label="NRIC"
                      disabled={this.state.disable}
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
                        disabled={this.state.disable}
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
                      disabled={this.state.disable}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="birthday"
                      id="date"
                      label="Birthday"
                      type="date"
                      disabled={this.state.disable}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="education-label">
                        Highest Education Qualification
                      </InputLabel>
                      <Select
                        name="education"
                        labelId="education-label"
                        id="education"
                        disabled={this.state.disable}
                      >
                        <MenuItem value="no_formal_qualification">
                          No formal qualification
                        </MenuItem>
                        <MenuItem value="primary">
                          Primary(complete 6th standard)
                        </MenuItem>
                        <MenuItem value="secondary">Secondary</MenuItem>
                        <MenuItem value="higher_secondary">
                          Higher Secondary
                        </MenuItem>
                        <MenuItem value="above_higher_secondary">
                          Above higher secondary
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="occupation-label">Occupation</InputLabel>
                      <Select
                        name="occupation"
                        labelId="occupation-label"
                        id="occupation"
                        disabled={this.state.disable}
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="homemaker">
                          Homemaker/Housewife
                        </MenuItem>
                        <MenuItem value="religious_work">
                          Religious Work
                        </MenuItem>
                        <MenuItem value="professional">
                          Professional (teacher, engineer, architect, doctor,
                          nurse, lawyer, management, finance, etc)
                        </MenuItem>
                        <MenuItem value="service_industry">
                          Service industry (e.g. restaurant server, call centre,
                          receptionist, hotel staff)
                        </MenuItem>
                        <MenuItem value="manual_labourer">
                          Manual labourer (e.g. farming, mining, construction,
                          cleaning)
                        </MenuItem>
                        <MenuItem value="skilled_labourer">
                          Skilled labourer (e.g. plumbing, electrician, cook,
                          tailor)
                        </MenuItem>
                        <MenuItem value="manufacturing">Manufacturing</MenuItem>
                        <MenuItem value="unemployed">Unemployed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Patient Profile
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}></AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>Station 1</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}></AccordionDetails>
            </Accordion> */}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Screening);
