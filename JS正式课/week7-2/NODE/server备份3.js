var http = require("http");
var url = require("url");
var fs = require("fs");
var sv = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->前端路由:资源文件的请求处理
    if (pathname === "/index.html") {
        var conFile = fs.readFileSync("." + pathname, "utf8");
        res.writeHead(200, {'content-type': 'text/html;charset=utf-8;'});
        res.end(conFile);
        return;
    }

    if (pathname === "/css/index.css") {
        conFile = fs.readFileSync("." + pathname, "utf8");
        res.writeHead(200, {'content-type': 'text/css;charset=utf-8;'});
        res.end(conFile);
    }
});
sv.listen(80, function () {
    console.log("server is create success!");
});
