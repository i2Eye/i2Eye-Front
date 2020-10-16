import React, { useState } from "react";
import { Formik, Form } from "formik";
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";
import { getStepValidationSchema } from "./Components/RegFormComponents/validationSchema";
import Button from "@material-ui/core/Button";
import getTestData from "./TestData";
import { postRegistration } from "./dbFunctions";
import { regFormJson } from "./Components/RegFormComponents/formatJson";

const renderStep = (
  step,
  { values, errors, touched, handleChange, setFieldValue }
) => {
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
      return <Confirm values={values} />;
    case 5:
      return <Success />;
    default:
      return 0;
  }
};

export const RegForm = (props) => {
  const emptyRegFormData = {
    // personal details
    name: "",
    nric: "",
    gender: "",
    birthday: "",
    age: "",
    education: "",
    occupation: "",

    // lifestyle
    exercise_freq: "",
    exercise_duration: "",

    // household info
    monthly_household_income: "",
    household_count: "",

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
    family_diabetes_count: "",

    family_has_anemia: "",
    family_anemia_count: "",

    family_has_oral_cancer: "",
    family_oral_cancer_count: "",

    pre_existing_conditions: "",
    family_pre_existing_conditions: "",
  };

  const getEditRegFormData = (id) => {
    const editRegFormData = getTestData(id).registration;
    return {
      // personal details
      name: editRegFormData[0].answer,
      nric: editRegFormData[1].answer,
      gender: editRegFormData[2].answer,
      birthday: editRegFormData[3].answer,
      age: editRegFormData[4].answer,
      education: editRegFormData[15].answer,
      occupation: editRegFormData[12].answer,

      // lifestyle
      exercise_freq: editRegFormData[16].answer,
      exercise_duration: editRegFormData[17].answer,

      // household info
      monthly_household_income: editRegFormData[13].answer,
      household_count: editRegFormData[14].answer,

      // medical conditions
      symptoms: editRegFormData[8].answer,
      cough_2_weeks:
        editRegFormData[8].answer.indexOf("Cough lasting for >2 weeks") >= 0,
      cough_up_blood:
        editRegFormData[8].answer.indexOf("Coughing up blood") >= 0,
      breathlessness: editRegFormData[8].answer.indexOf("Breathlessness") >= 0,
      weight_loss: editRegFormData[8].answer.indexOf("Weight loss") >= 0,
      loss_of_appetite:
        editRegFormData[8].answer.indexOf("Loss of apetite") >= 0,
      fever: editRegFormData[8].answer.indexOf("Fever") >= 0,
      no_symptom: editRegFormData[8].answer.indexOf("None of the above") >= 0,

      has_tubercolosis: editRegFormData[5].answer,
      live_with_someone_with_tubercolosis: editRegFormData[6].answer,
      other_diagnosed_with_tubercolosis_beyond_4_months:
        editRegFormData[7].answer,

      has_blood_borne_disease: editRegFormData[9].answer,
      blood_borne_disease: editRegFormData[10].answer,

      family_has_diabetes: editRegFormData[18].answer,
      family_diabetes_count: editRegFormData[19].answer,

      family_has_anemia: editRegFormData[20].answer,
      family_anemia_count: editRegFormData[21].answer,

      family_has_oral_cancer: editRegFormData[22].answer,
      family_oral_cancer_count: editRegFormData[23].answer,

      pre_existing_conditions: editRegFormData[11].answer,
      family_pre_existing_conditions: editRegFormData[24].answer,
    };
  };

  const {
    match: { params },
  } = props;

  const regFormData =
    params.patientID === undefined
      ? { ...emptyRegFormData }
      : getEditRegFormData(params.patientID);

  const [step, setStep] = useState(0);
  const isSubmitStep = step === 4;

  // a snapshot of form state is used as initialValues after each transition
  const [snapshot, setSnapshot] = useState({ ...regFormData });

  const nextStep = (values) => {
    setSnapshot(values);
    setStep(Math.min(step + 1, 6));
  };

  const prevStep = (values) => {
    setSnapshot(values);
    setStep(Math.max(step - 1, 0));
  };

  const handleSubmit = (values, formikBag) => {
    if (isSubmitStep) {
      const newUser = regFormJson(values);
      // create test user below
      // newUser = getTestData(1).registration
      console.log(newUser)
      postRegistration({Registration: newUser}).then(res => {
        console.log(res)
      });
      //return onSubmit(values, formikBag);
    } else if (step === 5) {
      // reset form
      setSnapshot((snapshot) => ({ ...regFormData }));
      formikBag.setValues({ ...regFormData });
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
      {(formik) => (
        <Form noValidate>
          {renderStep(step, formik)}
          {step > 0 && step < 5 && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginRight: 20 }}
              onClick={() => prevStep(formik.values)}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            type="submit"
            // disabled={step === 4 && formik.isSubmitting}
          >
            {isSubmitStep
              ? "Submit"
              : step < 5
              ? "Next"
              : "Register new patient"}
          </Button>
          {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default RegForm;
