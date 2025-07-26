
//* take dom object
let form = document.querySelector("form");
let input = document.querySelectorAll("input");
let chartBox = document.querySelector(".chartBoxHiden");
let radio = document.querySelectorAll('input[name="chart"]');
let radioChecked = document.querySelectorAll('input[name="chart"]:checked');
let fileBtn = document.querySelector(".file-btn");
let btns = document.querySelectorAll("button");

//*variables7
let isData = false;
let chartColor = [];
let multiReqValues = [];
let xval = [];
let yval = [];
let singleReqValues = [];
let takeData = [];
let takeDataSecendry = "";
let vals;
let iM = 0;
let minAvrage = 0;


console.log(input);
console.log(btns);

//chartcreate
const chartCreator = (x, y) => {
  if (input[2].value != "" && input[3].value != "") {
    input[3].value = "";
    input[4].value = "";
  }

  // Check if a chart
  const canvas = document.getElementById("myChart3");
  let myChart3 = Chart.getChart(canvas);

  // If a chart exists
  if (myChart3) {
    myChart3.destroy();
  }

  // Create a new chart
  myChart3 = new Chart(canvas, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: takeData[0] ? takeData[0].avrage : "data",
          data: y,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "xy",
            threshold: 5,
          },
        },
      },
      onClick: (event, elements, chart) => {
        if (event.native.detail === 2) {
          chart.resetZoom();
        }
      },
    },
  });
};

//submit or btn create chart
const submitbtn = async () => {
  let isCheck = document.querySelector('input[type="radio"]:checked');

  if (isCheck.value == "radioText") {
    if (isData) {
      if (input[2].value != "" && input[3].value == "") {
        await getData(input[2].value);
        input[2].disabled = true;
        chartCreator(singleReqValues[0], singleReqValues[1]);
      } else if (input[2].value != "" && input[3].value != "") {
        if (singleReqValues.length > 0) {          
          await getDataChartToChart(singleReqValues[1], input[3].value);
          console.log(singleReqValues);
          console.log(multiReqValues);
          
          chartCreatorMM(singleReqValues[0], singleReqValues[1], multiReqValues);
        } else {
          await getDataAll(input[2].value, input[3].value);
          chartCreator(multiReqValues[0], multiReqValues[1]);
        }
      } else if (input[2].value == "" && input[3].value == "") {
        alert("err!!");
      }
    }else {
      if (takeData.length <= 0) {
        await takeAllData(input[2].value,input[3].value)
        minAvrage = takeData[0].avrage        
        chartCreator(takeData[0].xValues, takeData[0].yValues);
        input[2].disabled = true;
      }else {
        await takeAllData(takeData[0].allValues,input[3].value);           
        minAvrage = minAvrage < takeData[iM].avrage ? minAvrage : takeData[iM].avrage
        chartCreatorM(takeData);
      }
      console.log(minAvrage);
      iM++;
      
    }


    if (chartBox.classList[0] == "chartBoxHiden") {
      chartBox.className = "chartBoxActive";
    }
  } else {
    console.log(isCheck.value);

    if (input[3].value === "") {

      singleReqValues = [[], []];
      for (let index = 0; index < vals.length; index++) {
        singleReqValues[0][index] = index + 1;
        singleReqValues[1][index] = Number(vals[index]);
      }
      chartCreator(singleReqValues[0], singleReqValues[1]);

    } else {
      if (singleReqValues.length > 0) {
        await getDataChartToChart(singleReqValues[1], input[3].value);

        console.log("single : ", singleReqValues);
        console.log("multip : ", multiReqValues);
        
        chartCreatorMM(singleReqValues[0], singleReqValues[1], multiReqValues);
      } else {
        singleReqValues = [[], []];
        for (let index = 0; index < vals.length; index++) {
        singleReqValues[0][index] = index + 1;
        singleReqValues[1][index] = Number(vals[index]);
      }
        console.log(2);

        let Minute = Number(input[3].value);
        let num = singleReqValues[0].length;

        let last = Minute - 1;
        let frist = 0;

        let multiReqValues = [...singleReqValues[1]];
        let yValues3 = [];
        let xValues3 = [];

        let num2 = 0;
        i = 0;

        while (last < num) {
          for (let index = frist; index <= last; index++) {
            num2 += multiReqValues[index];
          }
          last++;
          frist++;
          yValues3[i] = num2 / Minute;
          xValues3[i] = i + 1;
          num2 = 0;
          i++;
        }

        chartCreator(xValues3, yValues3);
      }
    }
    chartBox.className = "chartBoxActive";
  }
};


input[5].addEventListener("change", (e) => {
  if (e.target.checked) {
    isData = true;
  } else {
    isData =false;
  }
});






//*functional section
//*               *\\

//? form control
form.addEventListener("submit", async (e) => {
  e.preventDefault();
});

//? clean user chart
const chartReset = () => {
  takeData = [];
  multiReqValues = [];
  singleReqValues = [];
  iM = 0;
  input[2].disabled = false;
  input[2].value = "";
  input[3].value = "";
  input[4].value = "";
  chartColor = [];

  //todo Check if a chart
  const canvas = document.getElementById("myChart3");
  let myChart3 = Chart.getChart(canvas);

  //todo If a chart exists
  if (myChart3) {
    myChart3.destroy();
  }

  if (chartBox.classList[0] == "chartBoxHiden") {
  } else {
    chartBox.className = "chartBoxHiden";
  }
};

//? multi chart creator
const chartCreatorMM = (x1, y1, y2) => {
  input[3].value = "";
  input[4].value = "";

  let artt = [];
  let i = 0;

  artt[0] = {
    label: "Data",
    data: y1,
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(255, 14, 223, 0.2)",
    tension: 0.4,
  };

  console.log(y2);

  if (y2.length != chartColor.length) {
    console.log(chartColor.length);
    for (let index = chartColor.length; index <= y2.length-1; index++) {
      chartColor[index]= createChartColor();
      console.log(index);
    }
  }

  let y3 = y2.map((item) => {
    let obj = {
      label: "Data",
      data: item,
      borderColor: chartColor[i],
      backgroundColor: "rgba(192, 75, 167, 0.2)",
      tension: 0.4,
    };
    i++;
    return obj
  });

  for (let index = 0; index < y2.length; index++) {
    artt[index + 1] = y3[index];
  }

  console.log(artt);

  // Check if a chart
  const canvas = document.getElementById("myChart3");
  let myChart3 = Chart.getChart(canvas);

  // If a chart exists
  if (myChart3) {
    myChart3.destroy();
  }

  // Create a new chart

  myChart3 = new Chart(canvas, {
    type: "line",
    data: {
      labels: x1,
      datasets: artt.map((item) => item),
    },
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "xy",
            threshold: 4,
          },
        },
      },
      onClick: (event, elements, chart) => {
        if (event.native.detail === 2) {
          chart.resetZoom();
        }
      },
    },
  });
}
const chartCreatorM = (xy) => {
  input[3].value = "";

  let i = 0;

  if (xy.length != chartColor.length) {
    for (let index = chartColor.length; index <= xy.length-1; index++) {
      chartColor[index]= createChartColor();
    }
  }

  let findMinAvg = xy.findIndex(item => minAvrage == item.avrage)
  
  artt = xy.map(item => {
    if (item.yValues.length == takeData[findMinAvg].yValues.length) {
      
    }else{
      let yvalsi =item.yValues.length;
      for (let index = 0; index < takeData[findMinAvg].yValues.length - yvalsi; index++) {        
        item.yValues.unshift(0)    
      }
    }
    
  })

  let chartBar = xy.map((item) => {    
    let obj = {
      label: item.avrage,
      data: item.yValues,
      borderColor: chartColor[i],
      backgroundColor: "rgba(192, 75, 167, 0.2)",
      tension: 0.4,
    };
    i++;
    return obj
  });  

  // for (let index = 0; index < y2.length; index++) {
  //   artt[index + 1] = y3[index];
  // }

  // console.log(artt);

  // Check if a chart
  const canvas = document.getElementById("myChart3");
  let myChart3 = Chart.getChart(canvas);

  // If a chart exists
  if (myChart3) {
    myChart3.destroy();
  }

  // Create a new chart

  myChart3 = new Chart(canvas, {
    type: "line",
    data: {
      labels: takeData[findMinAvg].xValues,
      datasets: chartBar.map((item) => item),
    },
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "x",
            threshold: 2,
          },
        },
      },
      onClick: (event, elements, chart) => {
        if (event.native.detail === 2) {
          chart.resetZoom();
        }
      },
    },
  });
};

//?create spetial colorchart
const createChartColor = () => {
  let r = Math.floor(Math.random()*200)
  let g = Math.floor(Math.random()*200)
  let b = Math.floor(Math.random()*200)
  return (`rgb(${r +","+g +","+b})`)
}

//! feth data 
//! http://localhost:4000

//! getdata fullinfo
async function getDataAll(sum, num1) {
  if (multiReqValues.length > 0) {
    alert("please reset");
  } else {
    await fetch(
      `http://localhost:5000/api/chart/data?chartName=duble&num=${sum}&avg=${num1}`
    )
      .then((res) => res.json())
      .then((data) => {
        multiReqValues = [...data];
      });
    console.log(multiReqValues);
  }
}

//! getdata ChartToChart
async function getDataChartToChart(arr, avg) {
  await fetch(
    `http://localhost:5000/api/chart/data?chartName=MM&arr=${"[" + arr + "]"}&m=${avg}`
  )
    .then((res) => res.json())
    .then((data) => {
      multiReqValues[iM] = [...data];
      iM++;
    });
  console.log(multiReqValues);
}

//! getdatainfo
async function getData(sum) {
  if (singleReqValues.length > 0) {
    alert("please reset");
  } else {
    await fetch(
      `http://localhost:5000/api/chart/data?chartName=single&num=${sum}`
    )
      .then((res) => res.json())
      .then((data) => {
        singleReqValues = [...data];
      });
    console.log(singleReqValues);
  }
}

//! getdatainfo
async function takeAllData(num,avg) {
  if (takeData.length > 0) {
    await fetch(
      `http://localhost:5000/api/chart/data?chartName=chartToChart&arr=${"[" + num + "]"}&m=${avg}`
    )
      .then((res) => res.json())
      .then((data) => {        
        takeData[iM] = {...data};
    });
    console.log(takeData);
    // console.log("num : ", num , "avg : " , avg);
        
  } else {
    await fetch(
      `http://localhost:5000/api/chart/data?chartName=chart&num=${num}&avg=${avg}`
    )
      .then((res) => res.json())
      .then((data) => {
        takeData[iM] = {...data};
      });
          // console.log("num : ", num , "avg : " , avg);
  }
}

//* event handler *\\
btns[0].addEventListener("click", submitbtn);
btns[1].addEventListener("click", chartReset);

//? radio controler
radio.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    if (e.target.value == "radioFile") {
      if (fileBtn.classList[1] == "none") {
        fileBtn.classList.remove("none");
        input[2].classList.add("none");
      }
    }
    if (e.target.value == "radioText") {
      if (input[2].classList[1] == "none") {
        input[2].classList.remove("none");
        fileBtn.classList.add("none");
      }
    }
  });
});

//? file reader
input[4].addEventListener("change", async (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    vals = e.target.result;
    vals = vals.split(" ");
  });

  reader.readAsText(file);
});