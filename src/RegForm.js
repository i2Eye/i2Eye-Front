import React, { useState } from "react";
import { Formik, Form } from 'formik'
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";

const renderStep = (step, setStep, values, errors, touched, handleChange, isValid) => {
  switch (step) {
    case 1:
      return (
        <PersonalDetails
          step={step}
          setStep={setStep}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          isValid={isValid}
        />
      );
    case 2:
      return (
        <Lifestyle
          step={step}
          setStep={setStep}  
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          isValid={isValid}
        />
      );
    case 3:
      return (
        <HouseholdInfo
          step={step}
          setStep={setStep}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          isValid={isValid}
        />
      );
    case 4:
      return (
        <MedicalConditions
          step={step}
          setStep={setStep}  
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          isValid={isValid}
        />
      );
    case 5:
      return (
        <Confirm
          step={step}
          setStep={setStep}
          values={values}
        />
      );
    case 6:
      return <Success resetForm={this.resetForm} />;
    default:
      return 1;
  }
};

export const RegForm = () => {
  const [step, setStep] = useState(1);

  const regFormData = {
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
    monthly_household_income: 0.00,
    household_count: 0,
    
    // medical conditions
    symptoms: [],
    cough_2_weeks: false,
    cough_up_blood: false,
    breathlessness: false,
    weight_loss: false,
    loss_of_apetite: false,
    fever: false,

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
  }

  const validate = (values, props) => {
    const errors = {};

    if (!values.name) {
      errors.name = "This field is required"
    }

    if (!values.nric) {
      errors.nric = "This field is required"
    }

    if (!values.gender) {
      errors.gender = "This field is required"
    }

    if (!values.birthday) {
      errors.birthday = "This field is required"
    }

    if (!values.age) {
      errors.age = "This field is required"
    }

    if (!values.education) {
      errors.education = "This field is required"
    }
    if (!values.occupation) {
      errors.occupation = "This field is required"
    }
    if (!values.exercise_freq) {
      errors.exercise_freq = "This field is required"
    }
    if (!values.exercise_duration) {
      errors.exercise_duration = "This field is required"
    }
    if (!values.monthly_household_income) {
      errors.monthly_household_income = "This field is required"
    }
    if (!values.symptoms) {
      errors.symptoms = "This field is required"
    }
    if (!values.cough_2_weeks) {
      errors.cough_2_weeks = "This field is required"
    }
    if (!values.cough_up_blood) {
      errors.cough_up_blood = "This field is required"
    }
    if (!values.breathlessness) {
      errors.breathlessness = "This field is required"
    }
    if (!values.weight_loss) {
      errors.weight_loss = "This field is required"
    }
    if (!values.loss_of_apetite) {
      errors.loss_of_apetite = "This field is required"
    }
    if (!values.fever) {
      errors.fever = "This field is required"
    }
    if (!values.has_tubercolosis) {
      errors.has_tubercolosis = "This field is required"
    }
    if (!values.live_with_someone_with_tubercolosis) {
      errors.live_with_someone_with_tubercolosis = "This field is required"
    }
    if (!values.other_diagnosed_with_tubercolosis_beyond_4_months) {
      errors.other_diagnosed_with_tubercolosis_beyond_4_months = "This field is required"
    }
    if (!values.has_blood_borne_disease) {
      errors.has_blood_borne_disease = "This field is required"
    }
    if (!values.blood_borne_disease) {
      errors.blood_borne_disease = "This field is required"
    }
    if (!values.has_pre_existing_medical_conditions) {
      errors.has_pre_existing_medical_conditions = "This field is required"
    }
    if (!values.family_has_diabetes) {
      errors.family_has_diabetes = "This field is required"
    }
    if (!values.family_diabetes_count) {
      errors.family_diabetes_count = "This field is required"
    }
    if (!values.family_has_anemia) {
      errors.family_has_anemia = "This field is required"
    }
    if (!values.family_anemia_count) {
      errors.family_anemia_count = "This field is required"
    }
    if (!values.family_has_oral_cancer) {
      errors.family_has_oral_cancer = "This field is required"
    }
    if (!values.family_oral_cancer_count) {
      errors.family_oral_cancer_count = "This field is required"
    }
    if (!values.pre_existing_conditions) {
      errors.pre_existing_conditions = "This field is required"
    }
    if (!values.family_pre_existing_conditions) {
      errors.family_pre_existing_conditions = "This field is required"
    }
    return errors;
  };

  return (

    // const values = { name, nric, gender, birthday, age, education, occupation, exercise_freq, exercise_duration, monthly_household_income, household_count, symptoms, cough_2_weeks, cough_up_blood, breathlessness, weight_loss, loss_of_apetite, fever, has_tubercolosis, live_with_someone_with_tubercolosis, other_diagnosed_with_tubercolosis_beyond_4_months, has_blood_borne_disease, blood_borne_disease, has_pre_existing_medical_conditions, family_has_diabetes, family_diabetes_count, family_has_anemia, family_anemia_count, family_has_oral_cancer, family_oral_cancer_count, pre_existing_conditions, family_pre_existing_conditions };

    <Formik
        enableReinitialize
        initialValues={{ ...regFormData }}
        //onSubmit={handleSubmit}
        validate={validate}
      >
        {({ values, errors, touched, handleChange, isValid }) => (
          <Form>
            {renderStep(step, setStep, values, errors, touched, handleChange, isValid)}
          </Form>
        )}
      </Formik>
  );
};

export default RegForm;