const getTestData = (id) => {
  return {
    registration: [
      { num: 1, question: "Name", answer: "Person " + id },
      { num: 2, question: "NRIC No.", answer: "S0000000" },
      { num: 3, question: "Gender", answer: id % 2 === 0 ? "F" : "M" },
      {
        num: 4,
        question: "Birthdate",
        answer: "2020726",
      },
      { num: 5, question: "Age", answer: (id * 151) % 111 },
      { num: 6, question: "Do you have tubercolosis", answer: "N" },
      {
        num: 7,
        question: "Do ou live with someone with tubercolosis",
        answer: "Y",
      },
      {
        num: 8,
        question:
          "If Y to living with someone with tubercolosis, was he/she diagnosed more than 4 months ago?",
        answer: "Y",
      },
      {
        num: 9,
        question:
          "Are you currently suffereing from any of the following symptoms",
        answer: "None of the above",
      },
      {
        num: 10,
        question: "Do you have any blood borne diseases",
        answer: "N",
      },
      {
        num: 11,
        question:
          "If Y to having a blood borne disease, what Blood Borne Disease do you have",
        answer: "",
      },
      {
        num: 12,
        question: "Any pre-existing medical conditions",
        answer: "Y",
      },
      {
        num: 13,
        question: "What is your occupation",
        answer: "Service industry",
      },
      {
        num: 14,
        question: "Monthly Household Income (INR)",
        answer: ((id % 12) + 1) * 1000,
      },
      {
        num: 15,
        question:
          "How many people are there in the household (including yourself)",
        answer: id % 7,
      },
      {
        num: 16,
        question: "What is your highest education qualification",
        answer: "No formal qualification",
      },
      {
        num: 17,
        question:
          "How often do you exercise or do strenuous activity (lifting heavy objects, farming, construction work)",
        answer: "3-4 times a week",
      },
      {
        num: 18,
        question: "How long do you exercise per session (in hours)",
        answer: (id % 4) + 1,
      },
      {
        num: 19,
        question: "Do you know anyone in your family who has diabetes",
        answer: "Y",
      },
      {
        num: 20,
        question:
          "If Y to knowing anyone in the family who has diabetes, how many family members have diabetes",
        answer: id % 3,
      },
      {
        num: 21,
        question: "Do you know anyone in your family who has anemia",
        answer: "N",
      },
      {
        num: 22,
        question:
          "If Y to knowing anyone in the family who has anemia, how many family members have anemia",
        answer: 0,
      },
      {
        num: 23,
        question: "Do you know anyone in your family who has oral cancer",
        answer: "N",
      },
      {
        num: 24,
        question:
          "If Y to knowing anyone in the family who has oral cancer, how many family members have oral cancer?",
        answer: 0,
      },
      {
        num: 25,
        question: "Other pre-existing conditions of family members (if any)",
        answer: "",
      },
    ],
    oralHealth: [{ num: 1, question: "Dental ID", answer: "" }],
    bmi: [{ num: 1, question: "Height (m)", answer: "" }],
  };
};

export default getTestData;
