import React, { Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/AppLayouts/NavBar";

const Stations = lazy(() => import("./Stations"));
const PatientTracker = lazy(() => import("./PatientTracker"));
const RegForm = lazy(() => import("./RegForm"));
const Screening = lazy(() =>
  import("./Components/PatientTrackerComponents/Screening")
);
const Form = lazy(() => import("./Components/StationComponents/Form"));
const PatientSearch = lazy(() =>
  import("./Components/StationComponents/PatientSearch")
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavBar className={classes} />
        <div className={classes.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={RegForm} />
              <Route exact path="/stations" component={Stations} />
              <Route
                exact
                path="/stations/patient_search/:stationName"
                component={PatientSearch}
              />
              <Route
                exact
                path="/stations/patient_search/:stationName/:patientID"
                component={PatientSearch}
              />
              <Route exact path="/registration" component={RegForm} />
              <Route
                exact
                path="/registration/edit/:patientID"
                component={RegForm}
              />
              <Route exact path="/patient_tracker" component={PatientTracker} />
              <Route
                exact
                path="/patient_tracker/screening_review/:patientID"
                component={Screening}
              />
              <Route
                exact
                path="/stations/:stationName/:patientID"
                component={Form}
              />
              <Route
                exact
                path="/stations/:stationName/edit/:patientID"
                component={Form}
              />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    color: "white",
  },
  content: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 30,
    marginBottom: 30,
  },
}));
