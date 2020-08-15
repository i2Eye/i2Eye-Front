import React, { useState } from "react";
import { Formik, Form } from 'formik'
import PersonalDetails from "./Components/RegFormComponents/PersonalDetails";
import Lifestyle from "./Components/RegFormComponents/Lifestyle";
import HouseholdInfo from "./Components/RegFormComponents/HouseholdInfo";
import MedicalConditions from "./Components/RegFormComponents/MedicalConditions";
import Confirm from "./Components/RegFormComponents/Confirm";
import Success from "./Components/RegFormComponents/Success";
import Wizard from "./Components/RegFormComponents/Wizard";
import * as Yup from "yup";

// const renderStep = (step, setStep, values, errors, touched, handleChange, isValid, validateForm) => {
//   switch (step) {
//     case 1:
//       return (
//         <PersonalDetails
//           step={step}
//           setStep={setStep}
//           values={values}
//           errors={errors}
//           touched={touched}
//           handleChange={handleChange}
//           isValid={isValid}
//           validateForm={validateForm}
//         />
//       );
//     case 2:
//       return (
//         <Lifestyle
//           step={step}
//           setStep={setStep}  
//           values={values}
//           errors={errors}
//           touched={touched}
//           handleChange={handleChange}
//           isValid={isValid}
//         />
//       );
//     case 3:
//       return (
//         <HouseholdInfo
//           step={step}
//           setStep={setStep}
//           values={values}
//           errors={errors}
//           touched={touched}
//           handleChange={handleChange}
//           isValid={isValid}
//         />
//       );
//     case 4:
//       return (
//         <MedicalConditions
//           step={step}
//           setStep={setStep}  
//           values={values}
//           errors={errors}
//           touched={touched}
//           handleChange={handleChange}
//           isValid={isValid}
//         />
//       );
//     case 5:
//       return (
//         <Confirm
//           step={step}
//           setStep={setStep}
//           values={values}
//         />
//       );
//     case 6:
//       return <Success resetForm={this.resetForm} />;
//     default:
//       return 1;
//   }
// };

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

  return (

    // const values = { name, nric, gender, birthday, age, education, occupation, exercise_freq, exercise_duration, monthly_household_income, household_count, symptoms, cough_2_weeks, cough_up_blood, breathlessness, weight_loss, loss_of_apetite, fever, has_tubercolosis, live_with_someone_with_tubercolosis, other_diagnosed_with_tubercolosis_beyond_4_months, has_blood_borne_disease, blood_borne_disease, has_pre_existing_medical_conditions, family_has_diabetes, family_diabetes_count, family_has_anemia, family_anemia_count, family_has_oral_cancer, family_oral_cancer_count, pre_existing_conditions, family_pre_existing_conditions };

    <Wizard
        initialValues={{ ...regFormData }}
        onSubmit={() => console.log("wizard submit called")}
    >
        <PersonalDetails
          validationSchema={Yup.object({
            name: Yup.string().required("This field is required"),
            // nric: Yup.string().required("This field is required"),
            // gender: Yup.string().required("This field is required"),
            // birthday: Yup.date().required("This field is required"),
            // age: Yup.number().min(0).required("Postive age required"),
            // education: Yup.string().required("This field is required"),
            // occupation: Yup.string().required("This field is required"),
        })}
        values={regFormData} />
        
        <Lifestyle values={regFormData}/>

      </Wizard>
  );
};

export default RegForm;