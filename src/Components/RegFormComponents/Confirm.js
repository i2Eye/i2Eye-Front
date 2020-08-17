import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

export const Confirm = ({
  values,
}) => {
  const { name, nric, gender, birthday, age, education, occupation, exercise_freq, exercise_duration, monthly_household_income, household_count, symptoms, cough_2_weeks, cough_up_blood, breathlessness, weight_loss, loss_of_apetite, fever, has_tubercolosis, live_with_someone_with_tubercolosis, other_diagnosed_with_tubercolosis_beyond_4_months, has_blood_borne_disease, blood_borne_disease, family_has_diabetes, family_diabetes_count, family_has_anemia, family_anemia_count, family_has_oral_cancer, family_oral_cancer_count, pre_existing_conditions, family_pre_existing_conditions } = values;

  const getBooleanLabel = value => {
    if (value === true) {
      return 'Yes';
    }
    return 'No';
  }

    return (
      <div>
        <h1>Confirmation Page</h1>
        <p>Please check your details before submitting this form</p>

       
        <List subheader={<h3>Part 1: Personal Details</h3>} >
          <ListItemText primary="Name" secondary={name} />
          <ListItemText primary="NRIC" secondary={nric} />
          <ListItemText primary="Gender" secondary={gender} />
          <ListItemText primary="Birthday" secondary={birthday} />
          <ListItemText primary="Age" secondary={age} />
          <ListItemText primary="Education" secondary={education} />
          <ListItemText primary="Occupation" secondary={occupation} />
        </List>

        <List subheader={<h3>Part 2: Lifestyle</h3>} >
          <ListItemText primary="How often do you exercise or do strenuous activity (lifting heavy objects, farming, construction work) per week?" secondary={exercise_freq} />
          <ListItemText primary="How long do you exercise per session (in hours)?" secondary={exercise_duration} />
        </List>

        <List subheader={<h3>Part 3: Household Information</h3>} >
          <ListItemText primary="Monthly Household Income (INR) [total]" secondary={monthly_household_income} />
          <ListItemText primary="How many people are there in the household (including yourself)?" secondary={household_count} />
        </List>

        <List subheader={<h3>Part 4: Medical conditions</h3>} >
          {/* need to include symptoms */}

          <ListItemText primary="Do you have tubercolosis?" secondary={getBooleanLabel(has_tubercolosis)} />
          <ListItemText primary="Do you live with someone with tubercolosis?" secondary={getBooleanLabel(live_with_someone_with_tubercolosis)} />
          <ListItemText primary="If 'Yes' to living with someone with tubercolosis, was he/she diagnosed more than 4 months ago?" secondary={getBooleanLabel(other_diagnosed_with_tubercolosis_beyond_4_months)} />

          <ListItemText primary="Do you have any blood borne diseases?" secondary={getBooleanLabel(has_blood_borne_disease)} />
          <ListItemText primary="If 'Yes' to having a blood borne disease, what Blood Borne Disease do you have?" secondary={blood_borne_disease} />

          <ListItemText primary="Please enter any pre-existing medical conditions that you have." secondary={pre_existing_conditions} />

          <ListItemText primary="Do you know anyone in your family who has diabetes?" secondary={getBooleanLabel(family_has_diabetes)} />
          <ListItemText primary="If 'Yes' to knowing anyone in the family who has diabetes, how many family members have diabetes?" secondary={family_diabetes_count} />

          <ListItemText primary="Do you know anyone in your family who has anemia?" secondary={getBooleanLabel(family_has_anemia)} />
          <ListItemText primary="If 'Yes' to knowing anyone in the family who has anemia, how many family members have anemia?" secondary={family_anemia_count} />

          <ListItemText primary="Do you know anyone in your family who has oral cancer?" secondary={getBooleanLabel(family_has_oral_cancer)} />
          <ListItemText primary="If 'Yes' to knowing anyone in the family who has oral cancer, how many family members have oral cancer?" secondary={family_oral_cancer_count} />
          
          <ListItemText primary="Other pre-existing conditions of family member(s) (if any)" secondary={family_pre_existing_conditions} />
        </List>
      </div>
    );
}

export default Confirm;
