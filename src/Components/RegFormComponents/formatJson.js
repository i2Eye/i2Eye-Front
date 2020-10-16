export const regFormJson = (values) => {
  return [
      { "num": 1, "question": "Name", "answer": values.name },
      { "num": 2, "question": "NRIC No.", "answer": values.nric },
      { "num": 3, "question": "Gender", "answer": values.gender },
      {
        "num": 4,
        "question": "Birthdate",
        "answer": values.birthday,
      },
      { "num": 5, "question": "Age", "answer": values.age },
      { "num": 6, "question": "Do you have tubercolosis?", "answer": values.has_tubercolosis },
      {
        "num": 7,
        "question": "Do you live with someone with tubercolosis?",
        "answer": values.live_with_someone_with_tubercolosis,
      },
      {
        "num": 8,
        "question":
          "If Y to living with someone with tubercolosis, was he/she diagnosed more than 4 months ago?",
        "answer": values.other_diagnosed_with_tubercolosis_beyond_4_months,
      },
      {
        "num": 9,
        "question":
        "Are you currently suffering from any of the following symptoms?",
        "answer": values.symptoms,
      },
      {
        "num": 10,
        "question": "Do you have any blood borne diseases",
        "answer": values.has_blood_borne_disease,
      },
      {
        "num": 11,
        "question":
          "If Y to having a blood borne disease, what Blood Borne Disease do you have?",
        "answer": values.blood_borne_disease,
      },
      {
        "num": 12,
        "question": "Any pre-existing medical conditions?",
        "answer": values.pre_existing_conditions,
      },
      {
        "num": 13,
        "question": "What is your occupation?",
        "answer": values.occupation,
      },
      {
        "num": 14,
        "question": "Monthly Household Income (INR) [total]",
        "answer": values.monthly_household_income,
      },
      {
        "num": 15,
        "question":
          "How many people are there in the household (including yourself)?",
        "answer": values.household_count,
      },
      {
        "num": 16,
        "question": "What is your highest education qualification?",
        "answer": values.education,
      },
      {
        "num": 17,
        "question":
          "How often do you exercise or do strenuous activity (lifting heavy objects, farming, construction work)?",
        "answer": values.exercise_freq,
      },
      {
        "num": 18,
        "question": "How long do you exercise per session (in hours)?",
        "answer": values.exercise_duration,
      },
      {
        "num": 19,
        "question": "Do you know anyone in your family who has diabetes?",
        "answer": values.family_has_diabetes,
      },
      {
        "num": 20,
        "question":
          "If Y to knowing anyone in the family who has diabetes, how many family members have diabetes?",
        "answer": values.family_diabetes_count,
      },
      {
        "num": 21,
        "question": "Do you know anyone in your family who has anemia?",
        "answer": values.family_has_anemia,
      },
      {
        "num": 22,
        "question":
          "If Y to knowing anyone in the family who has anemia, how many family members have anemia?",
        "answer": values.family_anemia_count,
      },
      {
        "num": 23,
        "question": "Do you know anyone in your family who has oral cancer?",
        "answer": values.family_has_oral_cancer,
      },
      {
        "num": 24,
        "question":
          "If Y to knowing anyone in the family who has oral cancer, how many family members have oral cancer?",
        "answer": values.family_oral_cancer_count,
      },
      {
        "num": 25,
        "question": "Other pre-existing conditions of family members (if any)",
        "answer": values.family_pre_existing_conditions,
      },
    ];
};
