const httpModule = require("http");
const urlModule = require("url");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();

app.use(cors());
app.use(bodyParser.json());

//localhost:5000/api/chart/data?chartName=single&num=10
//localhost:5000/api/chart/data?chartName=duble&num=10&avg=5
//localhost:5000/api/chart/data?chartName=chartToChart&arr=[]&m=5

app.get("/api/chart/data",  async(req, res) => {
  if (req.query.chartName == "single") {
    let data = await chartDataCreatorSingle(req.query.num);

    res.json(data);
  } else if (req.query.chartName == "duble") {
    let data = chartDataCreatorDuble(req.query.num, req.query.avg);
    
    res.json(data);
  } else if (req.query.chartName == "chartToChart") {    
    console.log(req.url);
    console.log(req.query);
    
    let data = chartToChartDataCreator(req.query.arr, req.query.m);
    
    res.json(data);
  } else if (req.query.chartName == "chart") {    
    console.log(req.url);
    console.log(req.query);

    let data = await chartAllDataCreator(req.query.num, req.query.avg);
    
    res.json(data);
  } else if (req.query.chartName == "MM") {    
    let data = chartToChartDataCreatorMM(req.query.arr, req.query.m);
    
    res.json(data);
  }
});

function chartDataCreatorDuble(sum, avg) {
  let Minute = avg;
  let num = sum;

  let last = Minute - 1;
  let frist = 0;

  let Values = [];
  let yValues3 = [];
  let xValues3 = [];

  let num2 = 0;
  i = 0;

  for (let index = 0; index < num; index++) {
    let randomNum = (Math.random() * 3).toFixed();
    Values[index] = randomNum;
  }

  while (last < num) {
    for (let index = frist; index <= last; index++) {
      num2 += Number(...Values[index]);
    }
    last++;
    frist++;
    yValues3[i] = num2 / Minute;
    xValues3[i] = i + 1;
    num2 = 0;
    i++;
  }
  return (Values = [xValues3, yValues3]);
}

async function chartDataCreatorSingle(sum) {
  let num = sum;
  let i = 1;

  let Values = [];
  let yValues3 = [];
  let xValues3 = [];

  for (let index = 0; index < num; index++) {
    let randomNum = (Math.random() * 3).toFixed();
    Values[index] = randomNum;
  }

  for (let index = 0; index < num; index++) {
    yValues3[index] = Number(...Values[index]);
    xValues3[index] = i++;
  }

  return (Values = [xValues3, yValues3]);
}

app.listen(5000);

function chartToChartDataCreator(val,m) {
  let sum = JSON.parse(val).length;
  let allValues = JSON.parse(val)
  let y = []
  let x = []
  let avrage = Number(m);
  
  let last = avrage - 1;
  let frist = 0;
  let num2 = 0;
  
  // for (let index = 0; index < last; index++) {
  //   y[index] = 0;    
  // }
  // console.log(y);

  while (last < allValues.length) {
    for (let index = frist; index <= last; index++) {
      num2 += Number(allValues[index]);      
    }
    console.log(num2);
    y[frist] = (num2 / avrage);
    num2 = 0;
    last++;    
    frist++;
  
}

  for (let index = 0; index < y.length; index++) {
    x[index] = sum-index;
  }
  x = x.reverse()
// console.log("sos");

  return { allValues: allValues, xValues: x, yValues: y ,avrage: avrage};
}

// console.log(chartToChartDataCreator("[2,1,2,2,1,1,2,2,2,1]",5))
// console.log(chartAllDataCreator(10,5));

async function chartAllDataCreator(sum, avg) {
  let num = sum;
  let avrage = Number(avg);

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
    console.log(randomNum);
    
    allValues[index] = Number(randomNum);
  }

  // //To produce zero!
  // while (indexForAvg < last) {
  //   yValues[indexForAvg] = 0;
  //   indexForAvg++;
  // }

  //To produce avrage data
  while (last < num) {
    for (let index = frist; index <= last; index++) {
      num2 += allValues[index];
    }
    last++;
    frist++;
    yValues[indexForAvg] = num2 / avrage;
    num2 = 0;
    indexForAvg++;
  }

  //Specify xvalue
  for (let index = 0; index < yValues.length; index++) {
    xValues[index] = num-index;
  }
  xValues = xValues.reverse()
  

  //return
  return { allValues: allValues, xValues: xValues, yValues: yValues ,avrage: avrage};
}

function chartToChartDataCreatorMM(val,m) {
  let x = []
  let y = JSON.parse(val)
  let avg = Number(m);

  let last = avg - 1;
  let frist = 0;
  let num2 = 0;

  for (let index = 0; index < last; index++) {
    x[index] = 0;    
  }

  while (last < y.length) {
    for (let index = frist; index <= last; index++) {
      num2 += Number(y[index]);      
    }
  
  x[last] = (num2 / avg);
  num2 = 0;
  last++;    
  frist++;
}
console.log("sos");

return x;  
}