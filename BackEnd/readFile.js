const File = require("fs");
const http = require("http");

let values;

const server = http.createServer((req, res) => {
  File.readFile("backend/text.txt", "Utf-8", (err, data) => {
    if (err) {
    } else {
      values = data;
    }
  });

  res.write(JSON.stringify(values));
  res.end();
  values = [];
});
console.log(values);

server.listen(4000);
