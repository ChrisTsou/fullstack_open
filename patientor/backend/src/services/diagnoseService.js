"use strict";
exports.__esModule = true;
var diagnoses_json_1 = require("../../data/diagnoses.json");
var diagnoses = diagnoses_json_1["default"];
var getDiagnoses = function () {
    return diagnoses;
};
exports["default"] = {
    getDiagnoses: getDiagnoses
};
