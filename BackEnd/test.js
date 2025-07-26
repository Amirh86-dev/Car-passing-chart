async function chartDataCreatorSinglefg(sum, avg) {
  let num = sum;
  let avrage = avg;

  let last = avrage - 1;
  let frist = 0;
  let num2 = 0;
  let indexForAvg = 0;

  let allValues = [];
  let yValues = [];
  let xValues = [];

  //To produce data
  for (let index = 0; index < num; index++) {
    let randomNum = (Math.random() * 3).toFixed();
    allValues[index] = randomNum;
  }

  //Specify xvalue
  for (let index = 1; index <= num; index++) {
    xValues[index - 1] = index;
  }

  //To produce zero!
  while (indexForAvg < last) {
    yValues[indexForAvg] = 0;
    indexForAvg++;
  }

  //To produce avrage data
  while (last < num) {
    for (let index = frist; index <= last; index++) {
      num2 += Number(...allValues[index]);
    }
    last++;
    frist++;
    yValues[indexForAvg] = num2 / avrage;
    num2 = 0;
    indexForAvg++;
  }

  //return
  return { allValues: allValues, xValues: xValues, yValues: yValues };
}