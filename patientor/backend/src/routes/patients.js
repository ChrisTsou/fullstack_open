"use strict";
exports.__esModule = true;
var express_1 = require("express");
var patientService_1 = require("../services/patientService");
var utils_1 = require("../utils");
var router = express_1["default"].Router();
router.get("/", function (_req, res) {
    res.send(patientService_1["default"].getNonSensitivePatients());
});
router.post("/", function (req, res) {
    try {
        var newPatient = utils_1["default"](req.body);
        var addedPatient = patientService_1["default"].addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports["default"] = router;
