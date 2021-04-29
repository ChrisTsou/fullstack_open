import express from "express";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

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
      throw new Error("error is not of type Error");
    }
  }
});

app.post("/exercises", (req, res) => {
  const dailyExercises: any = req.body.daily_exercises;
  const target: any = req.body.target;

  if (typeof dailyExercises === "undefined" || typeof target === "undefined") {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    !(
      typeof target === "number" &&
      Array.isArray(dailyExercises) &&
      dailyExercises.every((e: any) => typeof e === "number")
    )
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  res.json(exerciseCalculator(dailyExercises, target));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
