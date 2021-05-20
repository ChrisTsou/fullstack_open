import patientData from "../../data/patients";
import { NewPatient, PublicPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils";

const patients: Array<Patient> = patientData.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const foundPatient = patients.find((p) => p.id === id);

  if (!foundPatient) {
    throw new Error("patient not found");
  }

  return foundPatient;
};

const addPatient = (patient: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatients,
  addPatient,
  getPatient,
};
