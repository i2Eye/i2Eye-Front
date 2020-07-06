import React, { Component } from "react";
import RegFormInput from "./Components/RegFormComponents/RegFormInput";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";

class RegForm extends Component {
  state = {
    step: 1,
    name: "",
    gender: "",
    age: "",
    birthday: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetForm = () =>
    this.setState({
      step: 1,
      name: "",
      gender: "",
      age: "",
      birthdate: "",
    });

  render() {
    const { step } = this.state;
    const { name, gender, age, birthdate } = this.state;
    const values = { name, gender, age, birthdate };
    switch (step) {
      case 1:
        return (
          <RegFormInput
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return <Success resetForm={this.resetForm} />;
      default:
        return 1;
    }
  }
}

export default RegForm;
