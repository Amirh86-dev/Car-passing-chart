const File = require("fs");
const { validateHeaderValue } = require("http");

let Values = [];
i = 0;

for (let index = 0; index < 10; index++) {
  let randomNum = (Math.random() * 3).toFixed();
  Values[index] = randomNum;
}

let data = "";

console.log(Values);
Values.forEach((e) => {
  data += e + " ";
});

console.log(data);


File.writeFile("text.txt", data , (e) => console.log(e));
