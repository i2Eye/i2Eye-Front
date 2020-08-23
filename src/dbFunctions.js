/* export const getAllPatients = async () =>
  fetch("/get_all_patients").then((response) => response.json()); */

export const getPatient = async (id) =>
  fetch("/get_data/" + id).then((response) => response.json());

export const getStationAvailability = async () =>
  fetch("/get_availability").then((response) => response.json());

export const getQuestions = async () =>
  fetch("/get_questions").then((response) => response.json());
