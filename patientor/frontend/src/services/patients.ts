import axios from "axios";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

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

export default {
  getAll,
  getOne,
  createNew,
};
