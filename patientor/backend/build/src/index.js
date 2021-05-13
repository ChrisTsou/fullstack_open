"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoseService_1 = __importDefault(require("./services/diagnoseService"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    res.send("pong");
});
app.get("/api/diagnoses", (_req, res) => {
    res.send(diagnoseService_1.default.getDiagnoses());
});
app.use("/api/patients", patients_1.default);
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});
