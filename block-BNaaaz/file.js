var http = require("http");
var fs = require("fs");

var server = http.createServer(handleRequest);

function handleRequest(res, req) {
  fs.createReadStream("./readme.txt").pipe(res);
}

server.listen(3000, () => {
  console.log("server is listening to port 3000");
});
