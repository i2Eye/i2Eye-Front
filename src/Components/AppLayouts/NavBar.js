import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HealingIcon from "@material-ui/icons/Healing";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { BrowserRouter as Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const classes = this.props.className;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            i2Eye
          </Typography>
          <Link to="/form">
            <IconButton className={classes.icon}>
              <HealingIcon />
            </IconButton>
          </Link>
          <Link to="/queue">
            <IconButton className={classes.icon}>
              <PeopleAltIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
