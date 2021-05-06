import patientData from "../../data/patients.json";
import { NonSensitivePatient, Patient } from "../types";

const patients: Array<Patient> = patientData;

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSensitivePatients,
};
