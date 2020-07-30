import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class MedicalConditions extends Component {
  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  prevStep = () => {
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, handleCheckbox } = this.props;

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
                  <Typography variant="h4">Medical Conditions</Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel htmlFor="symptoms">
                      Are you currently suffering from any of the following
                      symptoms?
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf(
                                "Cough lasting for > 2 weeks"
                              ) >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="Cough lasting for > 2 weeks"
                          />
                        }
                        label="Cough lasting for > 2 weeks"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf("Coughing up blood") >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="Coughing up blood"
                          />
                        }
                        label="Coughing up blood"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf("Breathlessness") >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="Breathlessness"
                          />
                        }
                        label="Breathlessness"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf("Weight loss") >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="Weight loss"
                          />
                        }
                        label="Weight loss"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf("Loss of apetite") >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="Loss of apetite"
                          />
                        }
                        label="Loss of apetite"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.symptoms.indexOf("Fever") >= 0}
                            onChange={handleCheckbox("symptoms")}
                            name="Fever"
                          />
                        }
                        label="Fever"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              values.symptoms.indexOf("None of the above") >= 0
                            }
                            onChange={handleCheckbox("symptoms")}
                            name="None of the above"
                          />
                        }
                        label="None of the above"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="has_tubercolosis">
                      Do you have tubercolosis?
                    </FormLabel>
                    <Select
                      name="has_tubercolosis"
                      id="has_tubercolosis"
                      onChange={handleChange}
                      value={values.has_tubercolosis}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="live_with_someone_with_tubercolosis">
                      Do you live with someone with tubercolosis?
                    </FormLabel>
                    <Select
                      name="live_with_someone_with_tubercolosis"
                      id="live_with_someone_with_tubercolosis"
                      onChange={handleChange}
                      value={values.live_with_someone_with_tubercolosis}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="other_diagnosed_with_tubercolosis_beyond_4_months">
                      If "Yes" to living with someone with tubercolosis, was
                      he/she diagnosed more than 4 months ago?{" "}
                    </FormLabel>
                    <Select
                      name="other_diagnosed_with_tubercolosis_beyond_4_months"
                      id="other_diagnosed_with_tubercolosis_beyond_4_months"
                      onChange={handleChange}
                      value={
                        values.other_diagnosed_with_tubercolosis_beyond_4_months
                      }
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="has_blood_borne_disease">
                      Do you have any blood borne diseases?
                    </FormLabel>
                    <Select
                      name="has_blood_borne_disease"
                      id="has_blood_borne_disease"
                      onChange={handleChange}
                      value={values.has_blood_borne_disease}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="has_blood_borne_disease">
                      If "Yes" to having a blood borne disease, what Blood Borne
                      Disease do you have?
                    </FormLabel>
                    <TextField
                      name="blood_borne_disease"
                      id="blood_borne_disease"
                      onChange={handleChange}
                      defaultValue={values.blood_borne_disease}
                      autoComplete="off"
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="pre_existing_conditions">
                      Do you have any pre-existing medical conditions?
                    </FormLabel>
                    <TextField
                      name="pre_existing_conditions"
                      id="pre_existing_conditions"
                      onChange={handleChange}
                      defaultValue={values.pre_existing_conditions}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_has_diabetes">
                      Do you know anyone in your family who has diabetes?
                    </FormLabel>
                    <Select
                      name="family_has_diabetes"
                      id="family_has_diabetes"
                      onChange={handleChange}
                      value={values.family_has_diabetes}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_diabetes_count">
                      If "Yes" to knowing anyone in the family who has diabetes,
                      how many family members have diabetes?
                    </FormLabel>
                    <TextField
                      name="family_diabetes_count"
                      id="family_diabetes_count"
                      type="number"
                      onChange={handleChange}
                      defaultValue={values.family_diabetes_count}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_has_anemia">
                      Do you know anyone in your family who has anemia?
                    </FormLabel>
                    <Select
                      name="family_has_anemia"
                      id="family_has_anemia"
                      onChange={handleChange}
                      value={values.family_has_anemia}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_anemia_count">
                      If "Yes" to knowing anyone in the family who has anemia,
                      how many family members have anemia?
                    </FormLabel>
                    <TextField
                      name="family_anemia_count"
                      id="family_anemia_count"
                      type="number"
                      onChange={handleChange}
                      defaultValue={values.family_anemia_count}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_has_diabetes">
                      Do you know anyone in your family who has oral cancer?
                    </FormLabel>
                    <Select
                      name="family_has_oral_cancer"
                      id="family_has_oral_cancer"
                      onChange={handleChange}
                      value={values.family_has_oral_cancer}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_oral_cancer_count">
                      If "Yes" to knowing anyone in the family who has oral
                      cancer, how many family members have oral cancer?
                    </FormLabel>
                    <TextField
                      name="family_oral_cancer_count"
                      id="family_oral_cancer_count"
                      type="number"
                      onChange={handleChange}
                      defaultValue={values.family_oral_cancer_count}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="family_pre_existing_conditions">
                      Other pre-existing conditions of family member(s) (if any)
                    </FormLabel>
                    <TextField
                      name="family_pre_existing_conditions"
                      id="family_pre_existing_conditions"
                      onChange={handleChange}
                      defaultValue={values.family_pre_existing_conditions}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={this.prevStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={this.nextStep}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

export default MedicalConditions;
