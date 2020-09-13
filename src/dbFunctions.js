//create
//remember to initialise empty values for each station question//
export const postRegistration = async ({ data }) =>
  await fetch("/submit_registration", {
    method: "POST",
    body: JSON.stringify({ data }),
  }).then(function (response1) {
    return response.json;
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
export const updatePatientData = async(patientID);

export const updatePatientStatus = async (patientID, isInStation) =>
  await fetch("/update_patient_status", {
    method: "POST",
    body: JSON.stringify({ patient_id: patientID, boolean: isInStation }),
  }).then(function (response) {
    return response.json;
  });

export const updateCompletedStations = async (patientID, completedStations) =>
  await fetch("/update_completed_stations/" + patientID, {
    method: "POST",
    body: JSON.stringify(completedStations),
  }).then(function (response) {
    return response.json;
  });

export const setStationAvailability = async (stationStatus) =>
  await fetch("/set_availability", {
    method: "POST",
    body: JSON.stringify(stationStatus),
  }).then(function (response) {
    return repsonse.json;
  });

//delete
export const deletePatient = async (patientID) =>
  await fetch("/delete_patient/" + patientID, {
    method: "POST",
  }).then(function (repsonse) {
    return response.json;
  });

// blanks to be inserted during Registration
