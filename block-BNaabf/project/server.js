var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var server = http.createServer(handleServer);

function handleServer(res, req) {
  var store = "";
  req
    .on("data", (chunk) => {
      store = store + chunk;
    })
    .on("end", () => {
      if (req.method === "GET" && req.url === "/form") {
        res.setHeaders("content-type", "text/html");
        fs.createReadStream("./form.html").pipe(res);
      } else if (req.method === "POST" && req.url === "/form") {
        res.setHeaders("content-type", "text/html");
        fs.createReadStream("./form.html").pipe(res);
      }
    });
}

server.listen(5678, () => {
  console.log("server is listening to port 5678");
});
