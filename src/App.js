import React, { Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HealingIcon from "@material-ui/icons/Healing";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Form = lazy(() => import("./Form"));
const Queue = lazy(() => import("./Queue"));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
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
        <div className={classes.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Form} />
              <Route exact path="/form" component={Form} />
              <Route exact path="/queue" component={Queue} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  icon: {
    color: "white"
  },
  content: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 30
  }
}));
