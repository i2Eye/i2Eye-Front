import React from "react";
import { Field, ErrorMessage } from 'formik';
import { Grid, Paper, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export const PersonalDetails = ({
  step,
  setStep,
  values,
  errors,
  touched,
  handleChange,
  isValid,
  validateForm,
  validationSchema,
}) => {
  
  const nextStep = async (e) => {
    e.preventDefault();
    // validate
    const errorsResult = await validateForm();
    // check if is valid
    if (errorsResult.length === 0) {
      setStep(++step);
    }
    return ;
  }

  return (
    console.log(<ErrorMessage name="name" />),
    <React.Fragment>
      <h1>Registration</h1>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper
            style={{
              paddingTop: 20,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 20,
            }}
          >
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant='h4'>Personal Details</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  required
                  name="name"
                  id="name"
                  label="Name"
                  //onChange={handleChange}
                  //defaultValue={values.name}
                  autoComplete="off"
                  fullWidth
                  // error={touched.name && errors.name}
                  // helperText={touched.name && errors.name}
                  //error={<ErrorMessage name="name"/>}
                  helperText={<ErrorMessage name="name" key="name"/>}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  required
                  name="nric"
                  id="nric"
                  label="NRIC"
                  onChange={handleChange}
                  defaultValue={values.nric}
                  autoComplete="off"
                  fullWidth
                  error={touched.nric && errors.nric}
                  helperText={touched.nric && errors.nric}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth required error={touched.gender && errors.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Field
                    as={Select}                    
                    name="gender"
                    labelId="gender-label"
                    id="gender"
                    onChange={handleChange}
                    value={values.gender}
                  >
                    <MenuItem value={"F"}>Female</MenuItem>
                    <MenuItem value={"M"}>Male</MenuItem>
                  </Field>
                  <FormHelperText>{(touched.gender && errors.gender) && errors.gender}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  required
                  name="age"
                  id="age"
                  label="Age"
                  type="number"
                  onChange={handleChange}
                  defaultValue={values.age}
                  fullWidth
                  error={touched.age && errors.age}
                  helperText={touched.age && errors.age}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  required
                  name="birthday"
                  id="date"
                  label="Birthday"
                  type="date"
                  onChange={handleChange}
                  defaultValue={values.birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  error={touched.birthday && errors.birthday}
                  helperText={touched.birthday && errors.birthday}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth required error={touched.education && errors.education}>
                  <InputLabel id="education-label">Highest Education Qualification</InputLabel>
                  <Field
                    as={Select}
                    name="education"
                    labelId="education-label"
                    id="education"
                    onChange={handleChange}
                    value={values.education}
                  >
                    <MenuItem value="no_formal_qualification">No formal qualification</MenuItem>
                    <MenuItem value="primary">Primary(complete 6th standard)</MenuItem>
                    <MenuItem value="secondary">Secondary</MenuItem>
                    <MenuItem value="higher_secondary">Higher Secondary</MenuItem>
                    <MenuItem value="above_higher_secondary">Above higher secondary</MenuItem>
                  </Field>
                <FormHelperText>{(touched.education && errors.education) && errors.education}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth required error={touched.occupation && errors.occupation}>
                  <InputLabel id="occupation-label">Occupation</InputLabel>
                  <Field
                    as={Select}                   
                    name="occupation"
                    labelId="occupation-label"
                    id="occupation"
                    onChange={handleChange}
                    value={values.occupation}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="homemaker">Homemaker/Housewife</MenuItem>
                    <MenuItem value="religious_work">Religious Work</MenuItem>
                    <MenuItem value="professional">Professional (teacher, engineer, architect, doctor, nurse, lawyer, management, finance, etc)</MenuItem>
                    <MenuItem value="service_industry">Service industry (e.g. restaurant server, call centre, receptionist, hotel staff)</MenuItem>
                    <MenuItem value="manual_labourer">Manual labourer (e.g. farming, mining, construction, cleaning)</MenuItem>
                    <MenuItem value="skilled_labourer">Skilled labourer (e.g. plumbing, electrician, cook, tailor)</MenuItem>
                    <MenuItem value="manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="unemployed">Unemployed</MenuItem>
                  </Field>
                <FormHelperText>{(touched.occupation && errors.occupation) && errors.occupation}</FormHelperText>  
                </FormControl>
              </Grid> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
    );
}

export default PersonalDetails;