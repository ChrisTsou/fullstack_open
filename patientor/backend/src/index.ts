import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnoseService";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
