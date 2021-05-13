"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var toNewPatient = function (_a) {
    var name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation;
    var isString = function (text) {
        return typeof text === "string" || text instanceof String;
    };
    var isDate = function (date) {
        return Boolean(Date.parse(date));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var isGender = function (param) {
        return Object.values(types_1.Gender).includes(param);
    };
    var parseName = function (name) {
        if (!name || !isString(name)) {
            throw new Error("Incorrect or missing name");
        }
        return name;
    };
    var parseOccupation = function (occupation) {
        if (!occupation || !isString(occupation)) {
            throw new Error("Incorrect or missing occupation");
        }
        return occupation;
    };
    var parseSsn = function (ssn) {
        if (!ssn || !isString(ssn)) {
            throw new Error("Incorrect or missing ssn");
        }
        return ssn;
    };
    var parseDateOfBirth = function (dateOfBirth) {
        if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
            throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
        }
        return dateOfBirth;
    };
    var parseGender = function (gender) {
        if (!gender || !isGender(gender)) {
            throw new Error("Incorrect or missing gender");
        }
        return gender;
    };
    var newPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};
exports["default"] = toNewPatient;
