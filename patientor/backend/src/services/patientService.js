"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var patients_json_1 = require("../../data/patients.json");
var uuid_1 = require("uuid");
var utils_1 = require("../utils");
var patients = patients_json_1["default"].map(function (obj) {
    var object = utils_1["default"](obj);
    object.id = obj.id;
    return object;
});
var getNonSensitivePatients = function () {
    return patients.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation
        });
    });
};
var addPatient = function (patient) {
    var newPatient = __assign({ id: uuid_1.v1() }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports["default"] = {
    getNonSensitivePatients: getNonSensitivePatients,
    addPatient: addPatient
};
