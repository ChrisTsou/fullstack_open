"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var diagnoseService_1 = require("./services/diagnoseService");
var patients_1 = require("./routes/patients");
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
var PORT = 3001;
app.get("/api/ping", function (_req, res) {
    res.send("pong");
});
app.get("/api/diagnoses", function (_req, res) {
    res.send(diagnoseService_1["default"].getDiagnoses());
});
app.use("/api/patients", patients_1["default"]);
app.listen(PORT, function () {
    console.log("server running on port: " + PORT);
});
