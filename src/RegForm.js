import React, { useState } from "react";
import { Formik, Form } from 'formik'
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";
import {getStepValidationSchema} from "./Components/RegFormComponents/validationSchema";
import Button from "@material-ui/core/Button";

const renderStep = (step, {values, errors, touched, handleChange, setFieldValue}) => {
  switch (step) {
    case 0:
      return (
        <PersonalDetails
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />
      );
    case 1:
      return (
        <Lifestyle
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />
      );
    case 2:
      return (
        <HouseholdInfo
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />
      );
    case 3:
      return (
        <MedicalConditions
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      );
    case 4:
      return (
        <Confirm
          values={values}
        />
      );
    case 5:
      return <Success />;
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
    loss_of_appetite: false,
    fever: false,
    no_symptom: false,

    has_tubercolosis: "",
    live_with_someone_with_tubercolosis: "",
    other_diagnosed_with_tubercolosis_beyond_4_months: "",
    
    has_blood_borne_disease: "",
    blood_borne_disease: "",
        
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
  const isSubmitStep = step === 4;

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

  const handleSubmit = (values, formikBag) => {
    if (isSubmitStep) {
      // code to send form data to backend here
      //return onSubmit(values, formikBag);
      return nextStep(values);
    } else if (step === 5) {
      // reset form
      setSnapshot(snapshot => ({...regFormData}));
      formikBag.setValues({...regFormData});
      // go back to first step of form (step 0)
      setStep(0);
    } else {
      formikBag.setTouched({}); // need to check if success page needs this
      nextStep(values);
    }
  };

  return (
    <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={getStepValidationSchema(step)}
      >
        {formik => (
          <Form noValidate>
            {renderStep(step, formik)}
            {(step > 0 && step < 5) && <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginRight: 20 }}
              onClick={() => prevStep(formik.values)}
            >
              Back
            </Button>}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              type="submit"
              // disabled={step === 4 && formik.isSubmitting}
            >
              {isSubmitStep ? 'Submit' : step < 5 ? 'Next' : 'Register new patient'}
            </Button>
            {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    );
};

export default RegForm;