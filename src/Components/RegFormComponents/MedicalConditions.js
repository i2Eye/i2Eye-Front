import React from "react";
import { Field } from 'formik';
import { Grid, Paper, Typography, FormLabel, Checkbox, FormControlLabel, FormGroup, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export const MedicalConditions = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
}) => {

    const manageSymptoms = (name, boolValue) => {
      if (boolValue === true && values.symptoms.indexOf(name) === -1) {
        values.symptoms.push(name);
      } else if (!boolValue && values.symptoms.indexOf(name) !== -1) {
        const removeIndex = values.symptoms.indexOf(name);
        values.symptoms.splice(removeIndex, 1);
      }
    };

    return (
      <React.Fragment>
        <h1>Registration</h1>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 30,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4'>Medical Conditions</Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel htmlFor="symptoms">Are you currently suffering from any of the following symptoms?</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={values.cough_2_weeks} 
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Cough lasting for > 2 weeks", e.target.checked);
                        }} 
                        name="cough_2_weeks" />}
                        label="Cough lasting for > 2 weeks"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={values.cough_up_blood} 
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Coughing up blood", e.target.checked);
                        }}
                        name="cough_up_blood" />}
                        label="Coughing up blood"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={values.breathlessness} 
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Breathlessness", e.target.checked);
                        }}
                        name="breathlessness" />}
                        label="Breathlessness"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={values.weight_loss} 
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Weight loss", e.target.checked);
                        }} 
                        name="weight_loss" />}
                        label="Weight loss"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={values.loss_of_appetite} 
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Loss of appetite", e.target.checked);
                        }} 
                        name="loss_of_appetite" />}
                        label="Loss of appetite"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={values.fever}
                        onChange={(e) => {
                          handleChange(e); 
                          manageSymptoms("Fever", e.target.checked);
                        }} 
                        name="fever" />}
                        label="Fever"
                      />
                      <FormControlLabel
                        control={<Checkbox
                          onChange={(e) => {
                            if (e.target.checked){
                              setFieldValue('cough_2_weeks', false);
                              setFieldValue('cough_up_blood', false);
                              setFieldValue('breathlessness', false);
                              setFieldValue('weight_loss', false);
                              setFieldValue('loss_of_appetite', false);
                              setFieldValue('fever', false);
                              // no symptoms when this option is chosen
                              setFieldValue('symptoms', []); 
                            }                            
                          }}/>}
                        label="None of the above"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.has_tubercolosis && errors.has_tubercolosis}>
                    <FormLabel htmlFor="has_tubercolosis">Do you have tubercolosis?</FormLabel>
                    <Field
                      as={Select}
                      name="has_tubercolosis"
                      id="has_tubercolosis"
                      onChange={handleChange}
                      value={values.has_tubercolosis}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.has_tubercolosis && errors.has_tubercolosis) && errors.has_tubercolosis}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.live_with_someone_with_tubercolosis && errors.live_with_someone_with_tubercolosis}>
                    <FormLabel htmlFor="live_with_someone_with_tubercolosis">Do you live with someone with tubercolosis?</FormLabel>
                    <Field
                      as={Select}
                      name="live_with_someone_with_tubercolosis"
                      id="live_with_someone_with_tubercolosis"
                      onChange={handleChange}
                      value={values.live_with_someone_with_tubercolosis}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.live_with_someone_with_tubercolosis && errors.live_with_someone_with_tubercolosis) && errors.live_with_someone_with_tubercolosis}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required={values.live_with_someone_with_tubercolosis === true} 
                    disabled={values.live_with_someone_with_tubercolosis !== true} 
                    error={touched.other_diagnosed_with_tubercolosis_beyond_4_months && errors.other_diagnosed_with_tubercolosis_beyond_4_months}>
                    <FormLabel htmlFor="other_diagnosed_with_tubercolosis_beyond_4_months">If "Yes" to living with someone with tubercolosis, was he/she diagnosed more than 4 months ago? </FormLabel>
                    <Field
                      as={Select}
                      name="other_diagnosed_with_tubercolosis_beyond_4_months"
                      id="other_diagnosed_with_tubercolosis_beyond_4_months"
                      onChange={handleChange}
                      value={values.other_diagnosed_with_tubercolosis_beyond_4_months}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.other_diagnosed_with_tubercolosis_beyond_4_months && errors.other_diagnosed_with_tubercolosis_beyond_4_months) && errors.other_diagnosed_with_tubercolosis_beyond_4_months}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.has_blood_borne_disease && errors.has_blood_borne_disease}>
                    <FormLabel htmlFor="has_blood_borne_disease">Do you have any blood borne diseases?</FormLabel>
                    <Field
                      as={Select}
                      name="has_blood_borne_disease"
                      id="has_blood_borne_disease"
                      onChange={handleChange}
                      value={values.has_blood_borne_disease}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.has_blood_borne_disease && errors.has_blood_borne_disease) && errors.has_blood_borne_disease}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required={values.has_blood_borne_disease === true} 
                    disabled={values.has_blood_borne_disease !== true} 
                    error={touched.blood_borne_disease && errors.blood_borne_disease}>
                    <FormLabel htmlFor="has_blood_borne_disease">If "Yes" to having a blood borne disease, what Blood Borne Disease do you have?</FormLabel>
                    <Field
                      as={TextField}
                      required
                      name="blood_borne_disease"
                      id="blood_borne_disease"
                      onChange={handleChange}
                      value={values.blood_borne_disease}
                      autoComplete="off"
                      fullWidth
                      disabled={values.has_blood_borne_disease !== true}
                      error={touched.blood_borne_disease && errors.blood_borne_disease}
                      helperText={touched.blood_borne_disease && errors.blood_borne_disease}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.pre_existing_conditions && errors.pre_existing_conditions}>
                    <FormLabel htmlFor="pre_existing_conditions">Please enter any pre-existing medical conditions that you have.</FormLabel>
                    <Field
                      as={TextField}
                      required
                      name="pre_existing_conditions"
                      id="pre_existing_conditions"
                      onChange={handleChange}
                      value={values.pre_existing_conditions}
                      autoComplete="off"
                      fullWidth
                      error={touched.pre_existing_conditions && errors.pre_existing_conditions}
                      helperText={touched.pre_existing_conditions && errors.pre_existing_conditions}
                    />
                    <FormHelperText>If none, enter 'NIL'.</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.family_has_diabetes && errors.family_has_diabetes}>
                    <FormLabel htmlFor="family_has_diabetes">Do you know anyone in your family who has diabetes?</FormLabel>
                    <Field
                      as={Select}
                      name="family_has_diabetes"
                      id="family_has_diabetes"
                      onChange={(e) => {
                        setFieldValue('family_diabetes_count', 0);
                        handleChange(e);
                      }}
                      value={values.family_has_diabetes}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.family_has_diabetes && errors.family_has_diabetes) && errors.family_has_diabetes}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required={values.family_has_diabetes === true} 
                    disabled={values.family_has_diabetes !== true}
                    error={touched.family_diabetes_count && errors.family_diabetes_count}>
                    <FormLabel htmlFor="family_diabetes_count">If "Yes" to knowing anyone in the family who has diabetes, how many family members have diabetes?</FormLabel>
                    <Field
                      as={TextField}
                      name="family_diabetes_count"
                      id="family_diabetes_count"
                      type="number"
                      onChange={handleChange}
                      value={values.family_diabetes_count}
                      fullWidth
                      disabled={values.family_has_diabetes !== true}
                      error={touched.family_diabetes_count && errors.family_diabetes_count}
                      helperText={touched.family_diabetes_count && errors.family_diabetes_count}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required error={touched.family_has_anemia && errors.family_has_anemia}>
                    <FormLabel htmlFor="family_has_anemia">Do you know anyone in your family who has anemia?</FormLabel>
                    <Field
                      as={Select}
                      name="family_has_anemia"
                      id="family_has_anemia"
                      onChange={(e) => {
                        setFieldValue('family_anemia_count', 0);
                        handleChange(e);
                      }}
                      value={values.family_has_anemia}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.family_has_anemia && errors.family_has_anemia) && errors.family_has_anemia}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth
                    required={values.family_has_anemia === true} 
                    disabled={values.family_has_anemia !== true}
                    error={touched.family_anemia_count && errors.family_anemia_count}>
                    <FormLabel htmlFor="family_anemia_count">If "Yes" to knowing anyone in the family who has anemia, how many family members have anemia?</FormLabel>
                    <Field
                      as={TextField}
                      name="family_anemia_count"
                      id="family_anemia_count"
                      type="number"
                      onChange={handleChange}
                      value={values.family_anemia_count}
                      fullWidth
                      disabled={values.family_has_anemia !== true}
                      error={touched.family_anemia_count && errors.family_anemia_count}
                      helperText={touched.family_anemia_count && errors.family_anemia_count}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={touched.family_has_oral_cancer && errors.family_has_oral_cancer}>
                    <FormLabel htmlFor="family_has_oral_cancer">Do you know anyone in your family who has oral cancer?</FormLabel>
                    <Field
                      as={Select}
                      name="family_has_oral_cancer"
                      id="family_has_oral_cancer"
                      onChange={(e) => {
                        setFieldValue('family_oral_cancer_count', 0);
                        handleChange(e);
                      }}
                      value={values.family_has_oral_cancer}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <FormHelperText>{(touched.family_has_oral_cancer && errors.family_has_oral_cancer) && errors.family_has_oral_cancer}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required={values.family_has_oral_cancer === true} 
                    disabled={values.family_has_oral_cancer !== true}
                    error={touched.family_oral_cancer_count && errors.family_oral_cancer_count}>
                    <FormLabel htmlFor="family_oral_cancer_count">If "Yes" to knowing anyone in the family who has oral cancer, how many family members have oral cancer?</FormLabel>
                    <Field
                      as={TextField}
                      name="family_oral_cancer_count"
                      id="family_oral_cancer_count"
                      type="number"
                      onChange={handleChange}
                      value={values.family_oral_cancer_count}
                      fullWidth
                      disabled={values.family_has_oral_cancer !== true}
                      error={touched.family_oral_cancer_count && errors.family_oral_cancer_count}
                      helperText={touched.family_oral_cancer_count && errors.family_oral_cancer_count}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_pre_existing_conditions">Other pre-existing conditions of family member(s) (if any)</FormLabel>
                    <TextField
                      name="family_pre_existing_conditions"
                      id="family_pre_existing_conditions"
                      onChange={handleChange}
                      value={values.family_pre_existing_conditions}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default MedicalConditions;
