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
import { postRegistration, getPatient, updatePatientData, updateCompletedStations, deletePatient } from "./dbFunctions";
import { regFormJson } from "./Components/RegFormComponents/formatJson";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop } from "@material-ui/core";
import SelectStations from "./Components/RegFormComponents/SelectStations";
import { resolveModuleNameFromCache } from "typescript";

const renderStep = (
  step,
  { values, errors, touched, handleChange, setFieldValue },
  patientId,
  errorPresent,
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
      return (
        <SelectStations
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      );
    case 5:
      return <Confirm values={values} errorPresent={errorPresent}/>;
    case 6:
      return <Success patientId={patientId}/>;
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

    // selected stations
    selectedStations: [],
    station1: false,
    station2: false,
    station3: false,
    station4: false,
    station5: false,
    station6: false,
    station7: false,
    station8: false,
  };

  const {
    match: { params },
  } = props;

  const regFormData = { ...emptyRegFormData }

  if (params.patientID !== undefined) {
    getPatient(params.patientID).then(res => {
      regFormData = {
        // personal details
        name: res[0].answer,
        nric: res[1].answer,
        gender: res[2].answer,
        birthday: res[3].answer,
        age: res[4].answer,
        education: res[15].answer,
        occupation: res[12].answer,
  
        // lifestyle
        exercise_freq: res[16].answer,
        exercise_duration: res[17].answer,
  
        // household info
        monthly_household_income: res[13].answer,
        household_count: res[14].answer,
  
        // medical conditions
        symptoms: res[8].answer,
        cough_2_weeks:
          res[8].answer.indexOf("Cough lasting for >2 weeks") >= 0,
        cough_up_blood:
          res[8].answer.indexOf("Coughing up blood") >= 0,
        breathlessness: res[8].answer.indexOf("Breathlessness") >= 0,
        weight_loss: res[8].answer.indexOf("Weight loss") >= 0,
        loss_of_appetite:
          res[8].answer.indexOf("Loss of apetite") >= 0,
        fever: res[8].answer.indexOf("Fever") >= 0,
        no_symptom: res[8].answer.indexOf("None of the above") >= 0,
  
        has_tubercolosis: res[5].answer,
        live_with_someone_with_tubercolosis: res[6].answer,
        other_diagnosed_with_tubercolosis_beyond_4_months:
          res[7].answer,
  
        has_blood_borne_disease: res[9].answer,
        blood_borne_disease: res[10].answer,
  
        family_has_diabetes: res[18].answer,
        family_diabetes_count: res[19].answer,
  
        family_has_anemia: res[20].answer,
        family_anemia_count: res[21].answer,
  
        family_has_oral_cancer: res[22].answer,
        family_oral_cancer_count: res[23].answer,
  
        pre_existing_conditions: res[11].answer,
        family_pre_existing_conditions: res[24].answer,
      }
    })
  }

  const [step, setStep] = useState(0);
  const isSubmitStep = step === 5;

  // a snapshot of form state is used as initialValues after each transition
  const [snapshot, setSnapshot] = useState({ ...regFormData });
  const [isLoading, setIsLoading] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);
  const [id, setID] = useState(0)

  const nextStep = (values) => {
    setSnapshot(values);
    setStep(Math.min(step + 1, 6));
  };

  const prevStep = (values) => {
    setSnapshot(values);
    setStep(Math.max(step - 1, 0));
  };

  const handleSubmit = (values, formikBag) => {
    if (isSubmitStep && params.patientID === undefined) {
      const newUser = regFormJson(values);
      const stations = {
      "Registration": "Completed",
      "Phlebotomy Test": values.station1 ? "In Queue" : "Not Queued",
      "Blood Pressure": values.station2 ? "In Queue" : "Not Queued",
      "BMI": values.station3 ? "In Queue" : "Not Queued",
      "Oral Health": values.station4 ? "In Queue" : "Not Queued",
      "Fingerstick Blood Test (Anemia)": values.station5 ? "In Queue" : "Not Queued",
      "Fingerstick Blood Test (RCBG)": values.station6 ? "In Queue" : "Not Queued",
      "Eye Screening": values.station7 ? "In Queue" : "Not Queued",
      "Doctor's Consult": values.station8 ? "In Queue" : "Not Queued"}
      setIsLoading(true);
      //reset error state for re-submissions
      setErrorPresent(false);

      // ---- for testing ----
      // create test user below
      // newUser = getTestData(1).registration
      // setTimeout(() => {
      //   setIsLoading(false);
      //   // success case
      //   // params.patientID = 1;
      //   // return nextStep(values);
      //   // error case
      //   setErrorPresent(false); 
      // }, 3000)
      // ---- end of testing code ----
      
      postRegistration(newUser).then(res => {
        setIsLoading(false);
        // check if response is a number (ie patientId)
        if (isNaN(res)) {
          setErrorPresent(true);
        } else {
          setErrorPresent(false);
          // registration successful
          nextStep(values); 
          setID(res)
          return res
        }
      }).then((res) => {
        updateCompletedStations(res, stations)
      }).catch(err => {
        if (id !== 0) {
          deletePatient(id)
          setID(0)
        }
        setErrorPresent(true);
      });
      
    } else if (isSubmitStep) {

    } else if (step === 6) {
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
          {renderStep(step, formik, id, errorPresent)}
          {step > 0 && step < 6 && !isLoading && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginRight: 20 }}
              onClick={() => prevStep(formik.values)}
              disabled={isLoading}
            >
              Back
            </Button>
          )}

          {!isLoading 
          ? <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            type="submit"
            disabled={isSubmitStep && isLoading}
          >
            {isSubmitStep  
              ? "Submit" 
              : step < 5
              ? "Next"
              : "Register new patient"}
          </Button>
          : <Backdrop open={isLoading}>
              <CircularProgress />
          </Backdrop>
          }
        </Form>
      )}
    </Formik>
  );
};

export default RegForm;
