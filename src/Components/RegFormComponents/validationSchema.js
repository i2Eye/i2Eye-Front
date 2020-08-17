import * as Yup from "yup";

export const getStepValidationSchema = (step) => {
  switch (step) {
    case 0:
      return Yup.object({
        name: Yup.string().required("This field is required"),
        nric: Yup.string().required("This field is required"),
        gender: Yup.string().required("This field is required"),
        birthday: Yup.date().required("This field is required"),
        age: Yup.number().min(0, "Age must be at least zero").required("This field is required"),
        education: Yup.string().required("This field is required"),
        occupation: Yup.string().required("This field is required"),
      });
    case 1:
      return Yup.object({
        exercise_freq: Yup.string().required("This field is required"),
        exercise_duration: Yup.number().min(0, "Hours must be at least zero").required("This field is required"),
      });
    case 2:
      return Yup.object({
        monthly_household_income: Yup.number().min(0, "Income must be at least zero").required("This field is required"),
        household_count: Yup.number().min(0,"Household count must be at least zero").required("This field is required"),
      });
    case 3:
      return Yup.object({
        symptoms: Yup.array().when('no_symptom', {
          is: true,
          then: Yup.array().of(Yup.string()),
          otherwise: Yup.array().of(Yup.string()).min(1),
        }),
        cough_2_weeks: Yup.boolean(),
        cough_up_blood: Yup.boolean(),
        breathlessness: Yup.boolean(),
        weight_loss: Yup.boolean(),
        loss_of_appetite: Yup.boolean(),
        fever: Yup.boolean(),
        no_symptom: Yup.boolean(),
        
        has_tubercolosis: Yup.boolean().required("This field is required"),
        live_with_someone_with_tubercolosis: Yup.boolean().required("This field is required"),
        other_diagnosed_with_tubercolosis_beyond_4_months: Yup.boolean().when('live_with_someone_with_tubercolosis', {
          is: true,
          then: Yup.string().required("This field is required"),
        }),        
        
        has_blood_borne_disease: Yup.boolean().required("This field is required"),
        blood_borne_disease: Yup.string().when('has_blood_borne_disease', {
          is: true,
          then: Yup.string().required("This field is required"),
        }),

        pre_existing_conditions: Yup.string().required("This field is required"),
            
        family_has_diabetes: Yup.boolean().required("This field is required"),
        family_diabetes_count: Yup.number().when('family_has_diabetes', {
          is: true,
          then: Yup.number().min(1, "This field must be at least 1").required("This field is required"),
        }), 
        
        family_has_anemia: Yup.boolean().required("This field is required"),
        family_anemia_count: Yup.number().when('family_has_anemia', {
          is: true,
          then: Yup.number().min(1, "This field must be at least 1").required("This field is required"),
        }),  
        
        family_has_oral_cancer: Yup.boolean().required("This field is required"),
        family_oral_cancer_count: Yup.number().when('family_has_oral_cancer', {
          is: true,
          then: Yup.number().min(1, "This field must be at least 1").required("This field is required"),
        }),
      });
    default:
      return null;
  }
}