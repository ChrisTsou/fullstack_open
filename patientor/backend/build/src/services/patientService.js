"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../utils"));
const patients = patients_json_1.default.map((obj) => {
    const object = utils_1.default(obj);
    object.id = obj.id;
    return object;
});
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
};
