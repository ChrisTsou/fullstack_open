import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

app.get("/api/patients", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
