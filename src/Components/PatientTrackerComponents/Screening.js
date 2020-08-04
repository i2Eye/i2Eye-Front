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
import Paper from "@material-ui/core/Paper";

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
          </Grid>

          <Grid item xs={4}>
            <Paper
              style={{
                height: 200,
                width: "100%",
              }}
            ></Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Screening);
