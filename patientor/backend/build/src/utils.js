"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, }) => {
    const isString = (text) => {
        return typeof text === "string" || text instanceof String;
    };
    const isDate = (date) => {
        return Boolean(Date.parse(date));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isGender = (param) => {
        return Object.values(types_1.Gender).includes(param);
    };
    const parseName = (name) => {
        if (!name || !isString(name)) {
            throw new Error("Incorrect or missing name");
        }
        return name;
    };
    const parseOccupation = (occupation) => {
        if (!occupation || !isString(occupation)) {
            throw new Error("Incorrect or missing occupation");
        }
        return occupation;
    };
    const parseSsn = (ssn) => {
        if (!ssn || !isString(ssn)) {
            throw new Error("Incorrect or missing ssn");
        }
        return ssn;
    };
    const parseDateOfBirth = (dateOfBirth) => {
        if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
            throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
        }
        return dateOfBirth;
    };
    const parseGender = (gender) => {
        if (!gender || !isGender(gender)) {
            throw new Error("Incorrect or missing gender");
        }
        return gender;
    };
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return newPatient;
};
exports.default = toNewPatient;
