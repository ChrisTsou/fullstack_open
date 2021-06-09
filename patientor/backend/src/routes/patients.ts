import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  try {
    res.json(patientService.getPatient(patientId));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;

  try {
    const entry = toNewEntry(req.body);
    res.send(patientService.addPatientEntry(patientId, entry));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
