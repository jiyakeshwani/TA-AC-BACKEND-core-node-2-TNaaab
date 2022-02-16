var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");
var path = require("path");

var server = http.createServer(handleServer);
const userDirName = __dirname + "./users/";

const userDir = path.join(__dirname, "./users/");

function handleServer(res, req) {
  let parsedUrl = url.parse(req.url, true);
  var store = "";
  req
    .on("data", (chunk) => {
      store = store + chunk;
    })
    .on("end", () => {
      if (req.url === "/users" && req.method === "POST") {
        var username = JSON.parse(store).username;

        fs.open(userDirName + username + ".json", "wx", (err, fd) => {
          if (err) {
            console.log(err);
          }
          fs.writeFile(fd, store, (err) => {
            if (err) {
              console.log(err);
            }
            fs.close(fd, (err) => {
              res.end(`${username} successfully created`);
            });
          });
        });
      } else if (parsedUrl.pathname === "/users" && req.method === "GET") {
        let username = parsedUrl.query.username;
        fs.readFile(file_path, (err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.setHeaders("content-type", "application/json");
            res.end(user);
          }
        });
      } else if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
        let username = parsedUrl.query.username;
        fs.unlink(userDirName + username + ".json", (err) => {
          if (err) {
            console.log(err);
          } else {
            res.end(`${username} deleted succesfully`);
          }
        });
      } else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
        let username = parsedUrl.query.username;
        fs.open(userDirName + username + ".json", "r+", (err, fd) => {
          if (err) return console.log(err);
          fs.ftruncate(fd, (err) => {
            if (err) return console.log(err);
            fs.writeFile(fd, store, (err) => {
              if (err) return console.log(err);
              fs.close(fd, () => {
                return res.end(`${username} updated successfully`);
              });
            });
          });
        });
      } else {
        res.statusCode = 404;
        res.end("page not found");
      }
    });
}

server.listen(3000, () => {
  console.log("server is listening to port 3k");
});
