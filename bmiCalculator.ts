interface BmiValues {
  height: number;
  weight: number;
}

interface BmiResult {
  height: number;
  weight: number;
  bmi: string;
}
const parseArguments = (height: string, weight: string): BmiValues => {
  const castedHeight = Number(height);
  const castedWeight = Number(weight);

  if (Number.isNaN(castedWeight) || Number.isNaN(castedHeight)) {
    throw new Error('Provided values were not numbers');
  } else {
    return {
      height: castedHeight,
      weight: castedWeight,
    };
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi > 40) {
    return 'Obese Class III (Very severely obese)';
  }
  if (bmi > 35) {
    return 'Obese Class II (Severely obese)';
  }
  if (bmi > 30) {
    return 'Obese Class I (Moderately obese)';
  }
  if (bmi > 25) {
    return 'Overweight';
  }
  if (bmi > 18.5) {
    return 'Normal (healthy weight)';
  }
  if (bmi > 16) {
    return 'Underweight';
  }
  if (bmi > 15) {
    return 'Severely underweight';
  }
  return 'Very Severely underweight';
};

const bmiCalculator = (requestHeight: string, requestWeight: string): BmiResult => {
  const { height, weight } = parseArguments(requestHeight, requestWeight);

  return {
    height,
    weight,
    bmi: calculateBmi(height, weight),
  };
};

export default bmiCalculator;
