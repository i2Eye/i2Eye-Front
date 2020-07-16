import React, { Component } from "react";
import RegFormInput from "./Components/RegFormComponents/RegFormInput";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";

class RegForm extends Component {
  state = {
    step: 1,
    name: "",
    nric: "",
    gender: "",
    birthday: "",
    age: 0,
    has_tubercolosis: "",
    live_with_someone_with_tubercolosis: "",
    other_diagnosed_with_tubercolosis_beyond_4_months: "",
    symptoms: [],
    has_blood_borne_disease: "",
    blood_borne_disease: [],
    has_pre_existing_medical_conditions: "",
    occupation: "",
    monthly_household_income: "",
    household_count: 0,
    education: "",
    exercise_freq: "",
    exercise_duration: "",
    family_has_diabetes: "",
    family_diabetes_count: 0,
    family_has_anemia: "",
    family_anemia_count: 0,
    family_has_oral_cancer: "",
    family_oral_cancer_count: 0,
    family_pre_existing_conditions: [],
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
    const { name, gender, age, birthday } = this.state;
    const values = { name, gender, age, birthday };
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
