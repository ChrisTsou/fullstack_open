interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (Number.isNaN(Number(args[2])) || Number.isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers');
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
};

const calculateBmi = (height: number, weight: number): String => {
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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error: ', e.message);
}
