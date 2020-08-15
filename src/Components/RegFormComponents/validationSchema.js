import * as Yup from "yup";

export const getStepValidationSchema = (step) => {
  switch (step) {
    case 0:
      return Yup.object({
        name: Yup.string().required("This field is required"),
        nric: Yup.string().required("This field is required"),
        gender: Yup.string().required("This field is required"),
        birthday: Yup.date().required("This field is required"),
        age: Yup.number().min(0).required("Postive age required"),
        education: Yup.string().required("This field is required"),
        occupation: Yup.string().required("This field is required"),
      })
  }
}