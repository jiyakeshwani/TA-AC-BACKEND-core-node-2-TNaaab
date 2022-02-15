var path = require("path");
var absolutePath = __dirname;

console.log(absolutePath);
console.log("./server.js");

var indexPath = path.join(absolutePath, "server.js");
console.log(indexPath);
