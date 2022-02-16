var absolutePath = __dirname;
console.log(absolutePath);
var path = require("path");
var appAbsolutePath = path.join(absolutePath, "./app.js");
console.log("./index.html");
var indexAbsolutePath = path.join(absolutePath, "./index.html");

console.log(appAbsolutePath, indexAbsolutePath);

var http = require("http");
var qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(res, req) {
  var dataFormat = req.headers("content-type");

  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    console.log(store, dataFormat);
    if (req.method === "POST" && req.url === "/") {
      res.statusCode = 201;
      res.end(store);
    } else if (
      req.method === "POST" &&
      req.url === "/" &&
      dataFormat === "application/x-www-form-urlencoded"
    ) {
      res.statusCode = 201;
      res.end(JSON.parse(store));
    }
  });
}

server.listen(7000, () => {
  console.log("server is listening to port 7000");
});
