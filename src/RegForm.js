import React, { Component } from "react";
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";
import getTestData from "./TestData";

const blankState = {
  step: 1,
  isEdit: false,
  // personal details
  name: "",
  nric: "",
  gender: "",
  birthday: "",
  age: 0,
  education: "",
  occupation: "",

  // lifestyle
  exercise_freq: "",
  exercise_duration: 0,

  // household info
  monthly_household_income: 0.0,
  household_count: 0,

  // medical conditions
  symptoms: [],

  has_tubercolosis: "",
  live_with_someone_with_tubercolosis: "",
  other_diagnosed_with_tubercolosis_beyond_4_months: "",

  has_blood_borne_disease: "",
  blood_borne_disease: "",
  has_pre_existing_medical_conditions: "",

  family_has_diabetes: "",
  family_diabetes_count: 0,

  family_has_anemia: "",
  family_anemia_count: 0,

  family_has_oral_cancer: "",
  family_oral_cancer_count: 0,

  pre_existing_conditions: "",
  family_pre_existing_conditions: "",
};

const handleEdit = (id) => {
  const data = getTestData(id).registration;
  const newState = {
    step: 1,
    isEdit: true,
    // personal details
    name: data[0].answer,
    nric: data[1].answer,
    gender: data[2].answer,
    birthday: data[3].answer,
    age: data[4].answer,
    education: data[15].answer,
    occupation: data[12].answer,

    // lifestyle
    exercise_freq: data[16].answer,
    exercise_duration: data[17].answer,

    // household info
    monthly_household_income: data[13].answer,
    household_count: data[14].answer,

    // medical conditions
    symptoms: data[8].answer,

    has_tubercolosis: data[5].answer,
    live_with_someone_with_tubercolosis: data[6].answer,
    other_diagnosed_with_tubercolosis_beyond_4_months: data[7].answer,

    has_blood_borne_disease: data[9].answer,
    blood_borne_disease: data[10].answer,

    family_has_diabetes: data[18].answer,
    family_diabetes_count: data[19].answer,

    family_has_anemia: data[20].answer,
    family_anemia_count: data[21].answer,

    family_has_oral_cancer: data[22].answer,
    family_oral_cancer_count: data[23].answer,

    pre_existing_conditions: data[11].answer,
    family_pre_existing_conditions: data[24].answer,
  };

  return newState;
};

const getState = (patientID) => {
  const id = Number(patientID);
  return isNaN(id) || id === 0 ? blankState : handleEdit(id);
};

class RegForm extends Component {
  state = getState(this.props.match.params.patientID);

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
    const value = e.target.value;
    //console.log(value);
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleCheckbox = (question) => (e) => {
    let options = this.state[question];
    options = options.filter((x) => x !== e.target.name);
    if (e.target.checked) {
      options.push(e.target.name);
    }
    this.setState({ [question]: options }, () =>
      console.log(this.state[question])
    );
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
    const {
      match: { params },
    } = this.props;

    const { step, isEdit } = this.state;

    const {
      name,
      nric,
      gender,
      birthday,
      age,
      education,
      occupation,
      exercise_freq,
      exercise_duration,
      monthly_household_income,
      household_count,
      symptoms,
      cough_2_weeks,
      cough_up_blood,
      breathlessness,
      weight_loss,
      loss_of_apetite,
      fever,
      has_tubercolosis,
      live_with_someone_with_tubercolosis,
      other_diagnosed_with_tubercolosis_beyond_4_months,
      has_blood_borne_disease,
      blood_borne_disease,
      has_pre_existing_medical_conditions,
      family_has_diabetes,
      family_diabetes_count,
      family_has_anemia,
      family_anemia_count,
      family_has_oral_cancer,
      family_oral_cancer_count,
      pre_existing_conditions,
      family_pre_existing_conditions,
    } = this.state;

    const values = {
      name,
      nric,
      gender,
      birthday,
      age,
      education,
      occupation,
      exercise_freq,
      exercise_duration,
      monthly_household_income,
      household_count,
      symptoms,
      cough_2_weeks,
      cough_up_blood,
      breathlessness,
      weight_loss,
      loss_of_apetite,
      fever,
      has_tubercolosis,
      live_with_someone_with_tubercolosis,
      other_diagnosed_with_tubercolosis_beyond_4_months,
      has_blood_borne_disease,
      blood_borne_disease,
      has_pre_existing_medical_conditions,
      family_has_diabetes,
      family_diabetes_count,
      family_has_anemia,
      family_anemia_count,
      family_has_oral_cancer,
      family_oral_cancer_count,
      pre_existing_conditions,
      family_pre_existing_conditions,
    };

    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Lifestyle
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <HouseholdInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <MedicalConditions
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleChangeMultiple={this.handleChangeMultiple}
            handleCheckbox={this.handleCheckbox}
            values={values}
          />
        );
      case 5:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            isEdit={isEdit}
            confirm={this.confirm}
            saveEdit={this.saveEdit}
          />
        );
      case 6:
        return <Success resetForm={this.resetForm} />;
      default:
        return 1;
    }
  }
}

export default RegForm;
