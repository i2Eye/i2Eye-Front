import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import Link from "@material-ui/core/Link";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = (theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "left",
    flexDirection: "column",
  },
  column: {
    flexBasis: "70%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  slider: {
    width: "80%",
    alignSelf: "center",
  },
});

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 110,
    label: ">100",
  },
];

class Filter extends Component {
  state = { open: false };

  getSliderLabel = (value) => (value > 100 ? ">100" : value);

  handleClickAway = () => {
    this.setState({ open: false });
  };

  handleChange = () => this.setState({ open: !this.state.open });

  render() {
    const {
      handleSlider,
      handleCheckbox,
      ageRange,
      isMale,
      isFemale,
      hasIncompleteStations,
      completedAllStations,
      resetFilter,
      classes,
    } = this.props;

    return (
      <ClickAwayListener
        onClickAway={this.handleClickAway}
        mouseEvent="onMouseDown"
      >
        <Accordion expanded={this.state.open}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
            onClick={this.handleChange}
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Filter Search</Typography>
            </div>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails className={classes.details}>
            <Typography variant="subtitle2">Age</Typography>
            <Slider
              value={ageRange}
              onChange={handleSlider}
              valueLabelFormat={this.getSliderLabel}
              aria-labelledby="range-slider"
              marks={marks}
              step={10}
              min={0}
              max={110}
              valueLabelDisplay="on"
              className={classes.slider}
            />
          </AccordionDetails>

          <Divider variant="middle" />
          <AccordionDetails className={classes.details}>
            <Typography variant="subtitle2">Gender</Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMale}
                    onChange={handleCheckbox}
                    name="isMale"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Male</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFemale}
                    onChange={handleCheckbox}
                    name="isFemale"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Female</Typography>}
              />
            </FormGroup>
          </AccordionDetails>

          <Divider variant="middle" />
          <AccordionDetails className={classes.details}>
            <Typography variant="subtitle2">Status</Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasIncompleteStations}
                    onChange={handleCheckbox}
                    name="hasIncompleteStations"
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    Has Incomplete Stations
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={completedAllStations}
                    onChange={handleCheckbox}
                    name="completedAllStations"
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    Completed All Stations
                  </Typography>
                }
              />
            </FormGroup>
            <Link variant="body2" onClick={resetFilter}>
              Reset
            </Link>
          </AccordionDetails>
        </Accordion>
      </ClickAwayListener>
    );
  }
}

export default withStyles(useStyles)(Filter);
