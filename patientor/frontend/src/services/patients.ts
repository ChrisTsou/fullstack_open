import axios from "axios";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { EntryFormValues } from "../PatientInfoPage/AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";

const getAll = async () => {
  const response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return response.data;
};

const getOne = async (id: string) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return response.data;
};

const createNew = async (newPatientValues: PatientFormValues) => {
  const response = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatientValues
  );

  return response.data;
};

const addEntry = async (id: string, values: EntryFormValues) => {
  const response = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    values
  );

  return response.data;
};

export default {
  getAll,
  getOne,
  createNew,
  addEntry,
};
