const getTestData = (id) => {
  return {
    "registration": [
      { num: 1, question: "Name", answer: "Person " + ((id * 173) % 190) },
      { num: 2, question: "NRIC No.", answer: "S0000000" },
      { num: 3, question: "Gender", answer: id % 2 === 0 ? "F" : "M" },
      {
        num: 4,
        question: "Birthdate",
        answer: 2020 - ((id * 151) % 111) + "-01-01",
      },
      { num: 5, question: "Age", answer: (id * 151) % 111 },
      { num: 6, question: "Do you have tubercolosis", answer: "N" },
      {
        num: 7,
        question: "Do you live with someone with tubercolosis",
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
        answer: ["None of the above"],
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
        answer: (id % 6) + 1,
      },
      {
        num: 16,
        question: "What is your highest education qualification",
        answer: "Secondary",
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
        answer: (id % 3) + 1,
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
    oralHealth: [
      { num: 1, question: "Dental ID", answer: "12345" },
      {
        num: 2,
        question:
          "Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)",
        answer: "Y",
      },
      {
        num: 3,
        question: "If Y to having consumed, what do you consume",
        answer: "tobacco",
      },
      {
        num: 4,
        question:
          "If Y to having consumed, how many pieces/sticks on average do you consume a day",
        answer: "<1 a day",
      },
      {
        num: 5,
        question:
          "If Y to having consumed, for how long have you been consuming",
        answer: "5 years",
      },
      {
        num: 6,
        question: "If Y to having consumed, why do you still consume",
        answer: "",
      },
      { num: 7, question: "Are you still consuming", answer: "N" },
      {
        num: 8,
        question: "If N to consuming now, when did you stop consuming",
        answer: "",
      },
      {
        num: 9,
        question: "If N to consuming now, why did you choose to stop",
        answer: "family",
      },
      {
        num: 10,
        question: "If Y to consuming now, have you tried quitting",
        answer: "",
      },
      {
        num: 11,
        question:
          "If Y, for how long? (e.g. Enter '4y, 5m' if 4 years and 5 months)",
        answer: "",
      },
      {
        num: 12,
        question: "If Y to having tried quitting, what made you consume again",
        answer: "",
      },
    ],
    bmi: [
      { num: 1, question: "Height (m)", answer: "" },
      { num: 2, question: "Weight (kg)", answer: "" },
      { num: 3, question: "Waist circumference (cm)", answer: "" },
    ],
    eyeScreening: [{ num: 1, question: "SNC ID", answer: "12345678" }],
    phlebotomy: [
      {
        num: 1,
        question: "Are you 40 years old or above",
        answer: (id * 151) % 111 >= 40 ? "Y" : "N",
      },
      {
        num: 2,
        question: "Are you suffereing from any of the following conditions",
        answer:
          (id * 151) % 111 >= 40
            ? []
            : [
                "Family member with coronory artery disease",
                "Family member with high cholesterol",
                "Smoking/intoxication consumption e.g. tobacco",
              ],
      },
      { num: 3, question: "Vimta Registration No.", answer: "12345678" },
    ],
    fingerstickAnemia: [
      { num: 1, question: "Hb level (g/dL)", answer: 12.8 },
      { num: 2, question: "How many meals do you eat a day", answer: 3 },
      {
        num: 3,
        question:
          "How often do you eat protein (e.g. daal, mung, rajma, chole, chana)",
        answer: "4-5 times weekly",
      },
      {
        num: 4,
        question: "How often do you eat carbohydrates (e.g. chapati, rice)",
        answer: "More than once daily",
      },
      {
        num: 5,
        question:
          "How often do you eat vegetables (e.g. gobhi, patta gobhi, saag)",
        answer: "Once a day",
      },
      {
        num: 6,
        question: "How often do you eat sweets/desserts (e.g. gulab jamun)",
        answer: "1-3 times weekly",
      },
    ],
    fingerstickRCBG: [
      {
        num: 1,
        question: "Is patient >18",
        answer: (id * 151) % 111 > 18 ? "Y" : "N",
      },
      {
        num: 2,
        question: "Randomy capillary blood glucose (mg/dL)",
        answer: 98,
      },
    ],
    bloodPressure: [
      {
        num: 1,
        question: "Is patient >18",
        answer: (id * 151) % 111 > 18 ? "Y" : "N",
      },
      {
        num: 2,
        question: "Systolic BP Reading 1 (mmHg)",
        answer: (id * 151) % 111 > 18 ? 110 : "NIL",
      },
      {
        num: 3,
        question: "Diastolic BP Reading 1 (mmHg)",
        answer: (id * 151) % 111 > 18 ? 70 : "NIL",
      },
      {
        num: 4,
        question: "Systolic BP Reading 2 (mmHg)",
        answer: (id * 151) % 111 > 18 ? 112 : "NIL",
      },
      {
        num: 5,
        question: "Diastolic BP Reading 2 (mmHg)",
        answer: (id * 151) % 111 > 18 ? 72 : "NIL",
      },
    ],
    doctorsConsult: [
      {
        num: 1,
        question: "Urgent doctor's consult: doctor's notes",
        answer: "",
      },
      {
        num: 2,
        question: "Standard doctor's consult: doctor's notes",
        answer: "",
      },
    ],
  };
};

export const getEmptyTestData = (id) => {
  return {
    registration: [
      { num: 1, question: "Name", answer: "Person " + id },
      { num: 2, question: "NRIC No.", answer: "S0000000" },
      { num: 3, question: "Gender", answer: id % 2 === 0 ? "F" : "M" },
      {
        num: 4,
        question: "Birthdate",
        answer: 2020 - ((id * 151) % 111) + "-01-01",
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
          "Are you currently suffering from any of the following symptoms",
        answer: ["None of the above"],
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
        answer: (id % 6) + 1,
      },
      {
        num: 16,
        question: "What is your highest education qualification",
        answer: "Secondary",
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
        answer: (id % 3) + 1,
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
    oralHealth: [
      { num: 1, question: "Dental ID", answer: "" },
      {
        num: 2,
        question:
          "Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)",
        answer: "",
      },
      {
        num: 3,
        question: "If Y to having consumed, what do you consume",
        answer: "",
      },
      {
        num: 4,
        question:
          "If Y to having consumed, how many pieces/sticks on average do you consume a day",
        answer: "",
      },
      {
        num: 5,
        question:
          "If Y to having consumed, for how long have you been consuming",
        answer: "",
      },
      {
        num: 6,
        question: "If Y to having consumed, why do you still consume",
        answer: "",
      },
      { num: 7, question: "Are you still consuming", answer: "N" },
      {
        num: 8,
        question: "If N to consuming now, when did you stop consuming",
        answer: "",
      },
      {
        num: 9,
        question: "If N to consuming now, why did you choose to stop",
        answer: "",
      },
      {
        num: 10,
        question: "If Y to consuming now, have you tried quitting",
        answer: "",
      },
      {
        num: 11,
        question: "If Y to having tried quitting, what made you consume again",
        answer: "",
      },
    ],
    bmi: [
      { num: 1, question: "Height (m)", answer: "" },
      { num: 2, question: "Weight (kg)", answer: "" },
      { num: 3, question: "Waist circumference (cm)", answer: "" },
    ],
    eyeScreening: [{ num: 1, question: "SNC ID", answer: "" }],
    phlebotomy: [
      {
        num: 1,
        question: "Are you 40 years old or above",
        answer: "",
      },
      {
        num: 2,
        question: "Are you suffereing from any of the following conditions",
        answer: [],
      },
      { num: 3, question: "Vimta Registration No.", answer: "" },
    ],
    fingerstickAnemia: [
      { num: 1, question: "Hb level (g/dL)", answer: "" },
      { num: 2, question: "How many meals do you eat a day", answer: "" },
      {
        num: 3,
        question:
          "How often do you eat protein (e.g. daal, mung, rajma, chole, chana)",
        answer: "",
      },
      {
        num: 4,
        question: "How often do you eat carbohydrates (e.g. chapati, rice)",
        answer: "",
      },
      {
        num: 5,
        question:
          "How often do you eat vegetables (e.g. gobhi, patta gobhi, saag)",
        answer: "",
      },
      {
        num: 6,
        question: "How often do you eat sweets/desserts (e.g. gulab jamun)",
        answer: "",
      },
    ],
    fingerstickRCBG: [
      {
        num: 1,
        question: "Is patient >18",
        answer: "",
      },
      {
        num: 2,
        question: "Randomy capillary blood glucose (mg/dL)",
        answer: "",
      },
    ],
    bloodPressure: [
      {
        num: 1,
        question: "Is patient >18",
        answer: "",
      },
      {
        num: 2,
        question: "Systolic BP Reading 1 (mmHg)",
        answer: "",
      },
      {
        num: 3,
        question: "Diastolic BP Reading 1 (mmHg)",
        answer: "",
      },
      {
        num: 4,
        question: "Systolic BP Reading 2 (mmHg)",
        answer: "",
      },
      {
        num: 5,
        question: "Diastolic BP Reading 2 (mmHg)",
        answer: "",
      },
    ],
    doctorsConsult: [
      {
        num: 1,
        question: "Urgent doctor's consult: doctor's notes",
        answer: "",
      },
      {
        num: 2,
        question: "Standard doctor's consult: doctor's notes",
        answer: "",
      },
    ],
  };
};

const checkQuestion = (num, question) => {
  if (
    question !== undefined &&
    question !== null &&
    Object.prototype.toString.call(question) === "[object Object]"
  ) {
    let count = 0;
    let check = true;
    for (var p in question) {
      count++;
      check =
        check &&
        (`${p}` === "num" || `${p}` === "question" || `${p}` === "answer");
      check = check && question[p] !== undefined && question[p] !== null;
    }

    if (count === 3 && check) {
      check = check && question.num === num;
      check =
        check &&
        Object.prototype.toString.call(question.question) === "[object String]";
      check =
        check &&
        (Object.prototype.toString.call(question.answer) ===
          "[object String]" ||
          Object.prototype.toString.call(question.answer) ===
            "[object Number]" ||
          Object.prototype.toString.call(question.answer) === "[object Array]");
      return check;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkData = (personData) => {
  if (
    //checks that data given is an object
    personData !== undefined &&
    personData !== null &&
    Object.prototype.toString.call(personData) === "[object Object]"
  ) {
    let count = 0;
    let check = true;
    const stations = {
      registration: 25,
      oralHealth: 11,
      bmi: 3,
      eyeScreening: 1,
      phlebotomy: 3,
      fingerstickAnemia: 6,
      fingerstickRCBG: 2,
      bloodPressure: 5,
      doctorsConsult: 2,
    };

    for (var s in personData) {
      count++;
      //checks stations
      check = check && stations[s] !== undefined;
      //checks that stations are arrays
      check =
        check &&
        personData[s] !== undefined &&
        personData[s] !== null &&
        Object.prototype.toString.call(personData[s]) === "[object Array]";
    }

    //checks number of stations
    let numOfStations = 0;
    for (var s in stations) {
      numOfStations++;
    }

    if (count === numOfStations && check) {
      //checks that all stations arrays present info as the standard question format
      for (var s in personData) {
        const numOfQuestions = stations[s];
        const listOfQuestions = personData[s];
        check = check && listOfQuestions.length === numOfQuestions;

        if (check) {
          for (let i = 0; i < numOfQuestions; i++) {
            check = check && checkQuestion(i + 1, listOfQuestions[i]);
          }
        }
      }
      return check;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkRegistration = (data) => {
  if (
    //checks that data given is an array
    data !== undefined &&
    data !== null &&
    Object.prototype.toString.call(data) === "[object Array]"
  ) {
    let check = true;
    for (let i = 0; i < 24; i++) {
      check = check && checkQuestion(i + 1, data[i]);
    }
    return check;
  } else {
    return false;
  }
};

export default getTestData;
