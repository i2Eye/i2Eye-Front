import React, { useState } from "react";
import { Formik, Form } from 'formik'
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";
import * as Yup from "yup";
import {getStepValidationSchema} from "./Components/RegFormComponents/validationSchema";
import Button from "@material-ui/core/Button";


const renderStep = (step, {values, errors, touched, handleChange}) => {
  switch (step) {
    case 0:
      return (
        <PersonalDetails
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          //isValid={isValid}
          //validateForm={validateForm}
        />
      );
    case 1:
      return (
        <Lifestyle
          step={step}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          //isValid={isValid}
        />
      );
    case 2:
      return (
        <HouseholdInfo
          step={step}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          //isValid={isValid}
        />
      );
    case 3:
      return (
        <MedicalConditions
          step={step}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          //isValid={isValid}
        />
      );
    case 4:
      return (
        <Confirm
          step={step}
          values={values}
        />
      );
    case 5:
      return <Success resetForm={this.resetForm} />;
    default:
      return 0;
  }
};

export const RegForm = () => {

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

  const [step, setStep] = useState(0);
  const isSubmitStep = step === 5;

  // a snapshot of form state is used as initialValues after each transition
  const [snapshot, setSnapshot] = useState({...regFormData});  
  
  const nextStep = values => {
    setSnapshot(values);
    setStep(Math.min(step + 1, 6));
  };

  const prevStep = values => {
    setSnapshot(values);
    setStep(Math.max(step - 1, 0));
  };

  const handleSubmit = (event, values, formikBag) => {
        if (isSubmitStep) {
      // code to send form data to backend here
      //return onSubmit(values, formikBag);
    } else {
      formikBag.setTouched({}); // need to check if success page needs this
      nextStep(values);
    }
  };

  return (

    // const values = { name, nric, gender, birthday, age, education, occupation, exercise_freq, exercise_duration, monthly_household_income, household_count, symptoms, cough_2_weeks, cough_up_blood, breathlessness, weight_loss, loss_of_apetite, fever, has_tubercolosis, live_with_someone_with_tubercolosis, other_diagnosed_with_tubercolosis_beyond_4_months, has_blood_borne_disease, blood_borne_disease, has_pre_existing_medical_conditions, family_has_diabetes, family_diabetes_count, family_has_anemia, family_anemia_count, family_has_oral_cancer, family_oral_cancer_count, pre_existing_conditions, family_pre_existing_conditions };

    <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={getStepValidationSchema(step)}
      >
        {formik => (
          <Form noValidate>
            {renderStep(step, formik)}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginRight: 20 }}
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              type="submit"
            >
              Next
            </Button>
            {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    );
};

export default RegForm;