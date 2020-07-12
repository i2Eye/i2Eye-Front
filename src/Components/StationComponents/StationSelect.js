/* eslint-disable default-case */
import React, { Component } from "react";
import StationList from "./StationList";
import PatientSearch from "./PatientSearch";


class StationSelect extends Component {
  state = {
    step: 1,
    id: ""
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };


  render() {
    const {step} = this.state;
    switch (step) {
      case 1:
        return (
          <StationList
                 nextStep={this.nextStep}
            />
        )

      case 2:
        return (
        <PatientSearch />
       )
    
  }
}
}

export default StationSelect;