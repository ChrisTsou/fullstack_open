import patientData from "../../data/patients";
import { NewPatient, PublicPatient, Patient, NewEntry } from "../types";
import { v1 as uuid } from "uuid";
import { toNewPatient } from "../utils";

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

const addPatientEntry = (id: string, entry: NewEntry) => {
  const oldPatient = patients.find((p) => p.id === id);

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  if (!oldPatient) {
    throw new Error("patient not found");
  }

  patients.map((patient) =>
    patient.id === id
      ? {
          ...patient,
          entries: patient.entries.push(newEntry),
        }
      : patient
  );

  return newEntry;
};

export default {
  getPublicPatients,
  addPatient,
  getPatient,
  addPatientEntry,
};
