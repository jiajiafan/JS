var http = require("http"),
    url = require("url"),
    fs = require("fs");
var sv = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj["pathname"],
        query = urlObj["query"];

    if (pathname === "/test") {
        var callbackName = query["a"];//->fn
        res.writeHead(200, {'content-type': 'text/javascript;charset=utf-8;'});
        res.end(callbackName + "(100)");//->"fn(100)"
    }
});
sv.listen(1234);