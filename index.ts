import express from "express";
import bmiCalculator from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    res.json({ error: "malformatted parameters" });
  }

  try {
    res.json(bmiCalculator(String(height), String(weight)));
  } catch (e) {
    if (e instanceof Error) {
      res.json({ error: e.message });
    } else {
      throw new Error("unknown error type");
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
