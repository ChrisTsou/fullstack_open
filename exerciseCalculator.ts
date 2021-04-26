interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  hoursPerDay: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
  if (args.length < 4) throw new Error('not enough arguments');

  const actualArgs = args.slice(2).map((a) => Number(a));

  actualArgs.forEach((arg) => {
    if (Number.isNaN(arg)) throw new Error('Provided values were not correct type');
  });

  return {
    hoursPerDay: actualArgs.slice(1),
    target: actualArgs[0],
  };
};

const calculateExercises = (hoursPerDay: Array<number>, target: number): ExerciseResult => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((n) => n !== 0).length;
  const average = hoursPerDay.reduce((acc, v) => acc + v, 0) / periodLength;

  const targetDiff = target - average;
  const ratings = [
    {
      rating: 3,
      ratingDescription: 'excellent!',
    },
    {
      rating: 2,
      ratingDescription: 'good job, push a bit harder',
    },
    {
      rating: 1,
      ratingDescription: 'exercise more',
    },
  ];

  let rating;
  let ratingDescription;
  if (targetDiff > 0) {
    if (targetDiff < 0.5) {
      rating = ratings[1].rating;
      ratingDescription = ratings[1].ratingDescription;
    } else {
      rating = ratings[2].rating;
      ratingDescription = ratings[2].ratingDescription;
    }
  } else {
    rating = ratings[0].rating;
    ratingDescription = ratings[0].ratingDescription;
  }

  return {
    periodLength,
    trainingDays,
    average,
    target,
    rating,
    ratingDescription,
    success: targetDiff <= 0,
  };
};

try {
  const { target, hoursPerDay } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hoursPerDay, target));
} catch (e) {
  console.log('Error: ', e.message);
}
