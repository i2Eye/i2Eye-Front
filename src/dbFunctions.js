//create
//remember to initialise empty values for each station question//
export const postRegistration = async (data) =>
  await fetch("/submit_registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(function (response) {
    return response.text();
  });

//read
export const getAllPatients = async () =>
  await fetch("/get_all_patients").then((response) => response.json());

export const getPatient = async (id) =>
  await fetch("/get_data/" + id).then((response) => response.json());

export const getStationAvailability = async () =>
  await fetch("/get_availability").then((response) => response.json());

export const getQuestions = async () =>
  await fetch("/get_questions").then((response) => response.json());

//update
export const updatePatientData = async (patientID, answers) =>
  await fetch("/update_patient_data/" + patientID, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  }).then(function (response) {
    return response.ok;
  });

export const updatePatientStatus = async (patientID, isAvailable) =>
  await fetch("/update_patient_status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ patient_id: patientID, boolean: isAvailable }),
  }).then(function (response) {
    return response.ok;
  });

export const updateCompletedStations = async (patientID, completedStations) =>
  await fetch("/update_completed_stations/" + patientID, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completedStations),
  }).then(function (response) {
    return response.ok;
  });

export const setStationAvailability = async (stationStatus) =>
  await fetch("/set_availability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stationStatus),
  }).then(function (response) {
    return response.ok;
  });

//delete
export const deletePatient = async (patientID) =>
  await fetch("/delete_patient/" + patientID, {
    method: "POST",
  }).then(function (response) {
    return response.ok;
  });
