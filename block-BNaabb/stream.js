var http = require("http");
var fs = require("fs");

var server = http.createServer(handleRequest);

function handleRequest(res, req) {
  console.log(req.method);

  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    console.log(store);
  });
}

server.listen(3456, () => {
  console.log("server is listening to port 3456");
});
