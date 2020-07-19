/* eslint-disable default-case */
import React, { Component } from "react";
import StationList from "./StationList";
import PatientSearch from "./PatientSearch";

class StationSelect extends Component {
  state = {
    step: 1,
    stations: [
      { name: "Station 1", checked: true },
      { name: "Station 2", checked: true },
    ],
    selectedStation: null,
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  previousStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleClick = (index) => (e) => {
    e.preventDefault();
    this.setState({ selectedStation: index });
    this.nextStep();
  };

  /* Takes in an index to find which station to handle. The event prop is automatically passed in through onChange and the state is updated */
  handleToggle = (index) => (event) => {
    const newStations = [...this.state.stations];
    const changedStation = { ...newStations[index] }; //deep copies
    changedStation.checked = event.target.checked; // change the checked value to that given by the onChange event
    newStations[index] = changedStation; //reassigns to appropriate index
    this.setState({ stations: newStations }); //sets state
  };

  render() {
    const { step, stations, selectedStation } = this.state;
    switch (step) {
      case 1:
        return (
          <StationList
            nextStep={this.nextStep}
            handleToggle={this.handleToggle}
            stations={this.state.stations}
            handleClick={this.handleClick}
          />
        );

      case 2:
        return (
          <PatientSearch
            handleToggle={this.handleToggle(selectedStation)}
            station={stations[selectedStation]}
            previousStep={this.previousStep}
          />
        );
      default:
        return 1;
    }
  }
}

export default StationSelect;
