import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthEntry,
} from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

type ToEntryFields = {
  type: unknown;
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const toEntry = ({
  type,
  id,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: ToEntryFields): Entry => {
  const parseId = (id: unknown): string => {
    if (!id || !isString(id)) {
      throw new Error("incorrect or missing id");
    }

    return id;
  };

  const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
      throw new Error("incorrect or missing description");
    }

    return description;
  };

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error("incorrect or missing entry date");
    }

    return date;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
      throw new Error("incorrect or missing specialist");
    }

    return specialist;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthCheckRating = (
    healthCheckRating: unknown
  ): HealthCheckRating => {
    if (
      typeof healthCheckRating === undefined ||
      !isHealthCheckRating(healthCheckRating)
    ) {
      throw new Error("incorrect or missing healthCheckRating");
    }

    return healthCheckRating;
  };

  const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
      throw new Error("incorrect or missing employerName");
    }

    return employerName;
  };

  const isDischarge = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    discharge: any
  ): discharge is HospitalEntry["discharge"] => {
    return isDate(discharge.date) && isString(discharge.criteria);
  };

  const parseDischarge = (discharge: unknown): HospitalEntry["discharge"] => {
    if (!discharge || !isDischarge(discharge)) {
      throw new Error("incorrect or missing employerName");
    }

    return discharge;
  };

  const parseDiagnosisCodes = (
    diagnosisCodes: unknown
  ): Array<Diagnosis["code"]> | undefined => {
    if (!diagnosisCodes) return undefined;

    if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
      throw new Error("incorrect entry diagnosis code");
    }

    return diagnosisCodes;
  };

  const isSickLeave = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sickLeave: any
  ): sickLeave is OccupationalHealthEntry["sickLeave"] => {
    return isString(sickLeave.startDate) && isString(sickLeave.endDate);
  };

  const parseSickLeave = (
    sickLeave: unknown
  ): OccupationalHealthEntry["sickLeave"] => {
    if (!sickLeave) return undefined;

    if (!isSickLeave(sickLeave)) {
      throw new Error("incorrect or missing sickLeave");
    }

    return sickLeave;
  };

  const baseEntry = {
    id: parseId(id),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  const finalEntry = () => {
    switch (type) {
      case "HealthCheck":
        return {
          type,
          ...baseEntry,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };
      case "OccupationalHealthcare":
        return {
          type,
          ...baseEntry,
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave),
        };
      case "Hospital":
        return {
          type,
          ...baseEntry,
          discharge: parseDischarge(discharge),
        };
      default:
        throw new Error("invalid entry type");
    }
  };

  return finalEntry();
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name");
    }

    return name;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Incorrect or missing occupation");
    }

    return occupation;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error("Incorrect or missing ssn");
    }

    return ssn;
  };

  const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
    }

    return dateOfBirth;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error("Incorrect or missing gender");
    }

    return gender;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isEntry = (entry: any): entry is Entry => {
    return Boolean(toEntry(entry));
  };

  const parseEntries = (entries: unknown): Entry[] => {
    if (!entries) {
      return [];
    }

    if (!Array.isArray(entries) || !entries.every(isEntry)) {
      throw new Error("Incorrect patient entries found");
    }

    return entries;
  };

  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatient;
};
