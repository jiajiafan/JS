var http = require("http");
var url = require("url");//->URL这个模块是用来解析URL地址中的相关信息的 url.parse:就是这个模块用来提供解析的方法
var fs = require("fs");//->FS模块中提供了一系列的方法,供我们进行文件的I/O操纵

var sv = http.createServer(function (req, res) {
    //1、接收客户端的请求信息,并且获取客户端请求的资源文件名称(req->request)
    //->req.url:存储的是当前客户端请求的资源文件的路径和名称以及问号后面传递的参数值(例如：“/video/ready.html?name=zhufeng”)
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //2、根据请求资源文件的目录和名称,获取到该文件中的内容,并且把获取的内容响应给客户端
    if (pathname === "/ready.html") {
        //->fs.readFileSync:同步读取某一个资源文件中的内容([文件地址],"utf8")  sync(同步) async(异步) ->获取的内容格式是一个字符串
        //->var conFile = fs.readFileSync("./ready.html", "utf8");
        var conFile = fs.readFileSync("." + pathname, "utf8");

        res.writeHead(200, {'content-type': 'text/html;charset=utf-8;'});
        res.end(conFile);//->写响应信息和结束响应都完成了,相当于res.write(conFile); res.end();
    }
});
sv.listen(80, function () {
    console.log("server is create success!");
});
