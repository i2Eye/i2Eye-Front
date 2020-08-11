import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HealingIcon from "@material-ui/icons/Healing";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import BallotIcon from "@material-ui/icons/Ballot";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

class NavBar extends Component {
  render() {
    const { className: classes } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            i2Eye
          </Typography>
          <Link to="/registration">
            <Tooltip title="Registration">
              <IconButton className={classes.icon}>
                <HealingIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/stations">
            <Tooltip title="Stations">
              <IconButton className={classes.icon}>
                <BallotIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/patient_tracker">
            <Tooltip title="Patient Tracker">
              <IconButton className={classes.icon}>
                <PeopleAltIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
