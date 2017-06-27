var http = require("http");
var url = require("url");
var fs = require("fs");
var sv = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->前端路由
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {//->说明客户端请求的是资源文件
        try {
            //->1)通过文件的后缀名获取到对应的MIME类型
            var suffix = reg.exec(pathname)[1].toUpperCase();
            var suffixType = "text/plain";
            switch (suffix) {
                case "HTML":
                    suffixType = "text/html";
                    break;
                case "CSS":
                    suffixType = "text/css";
                    break;
                case "JS":
                    suffixType = "text/javascript";
                    break;
            }

            //->2)读取对应资源文件中的内容
            var conFile = fs.readFileSync("." + pathname, "utf8");

            //->3)把内容响应给客户端
            res.writeHead(200, {'content-type': suffixType + ';charset=utf-8;', 'zhufeng': 7});
            res.end(conFile);

        } catch (e) {
            res.writeHead(404);
            res.end();
        }
        return;
    }

    //->数据请求
    if (pathname === "/getAllList") {
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify({
            "name": "钱包",
            "age": 7
        }));
    }

});
sv.listen(80, function () {
    console.log("server is create success!");
});
