//->导入所需要的模块
var http = require("http"),
    fs = require("fs"),
    url = require("url");
var suffixType = require("./nodeModule/suffixType");

//->创建SERVER服务
var reg = /\.(HTML|CSS|JS)/i;
var sv = http.createServer(function (req, res) {
    //->接收客户端的请求信息
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->资源文件的处理
    if (reg.test(pathname)) {
        try {
            //->获取资源文件的后缀名,通过后缀名计算出其MIME类型
            var suffix = reg.exec(pathname)[1].toUpperCase(),
                suType = suffixType.getType(suffix);

            //->根据请求资源文件的路径获取到文件的中代码,并且把内容响应给客户端
            var conFile = fs.readFileSync("." + pathname, "utf8");
            res.writeHead(200, {'content-type': suType + ';charset=utf-8;'});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            res.end('请求的资源文件在服务器中并不存在!');
        }
        return;
    }

    var path = "./nodeModule/customInfo.json";
    //->获取所有的客户信息
    if (pathname === "/getAllList") {
        var allList = fs.readFileSync(path, "utf8");
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(allList);
    }

    //->新增用户
    if (pathname === "/add") {
        var addTemp = "";
        req.addListener("data", function (postCon) {
            addTemp += postCon;
        });
        req.addListener('end', function () {
            var con = fs.readFileSync(path, "utf8");
            con = JSON.parse(con);
            addTemp = JSON.parse(addTemp);
            if (con.length === 0) {
                addTemp["id"] = 1;
            } else {
                addTemp["id"] = parseFloat(con[con.length - 1]["id"]) + 1;
            }
            con.push(addTemp);
            fs.writeFileSync(path, JSON.stringify(con));
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify({
                "code": 0,
                "message": "创建成功!"
            }));
        });
        return;
    }

    //->获取指定用户的详细信息
    if (pathname === "/getInfo") {
        //query["id"]:因为本接口采用的是GET请求,传递给服务器端的内容都在URL后面通过问号传参的方式传递进来的，而一开始我们使用url.parse已经把参数值解析成对象的键值对存储到query这个对象中了，所以此处的query["id"]就是客户端传递给服务器端指定的那个用的编号
        var con = fs.readFileSync(path, "utf8");
        con = JSON.parse(con);
        var curObj = null;
        for (var i = 0; i < con.length; i++) {
            if (con[i]["id"] == query["id"]) {//->当前这一项的ID和传递进来的ID是相等的,说明这一项就是我们想要获取的
                curObj = con[i];
                break;
            }
        }
        if (!curObj) {//->说明传递进来的ID在文件中不存在,我们让其等于空对象
            curObj = {};
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(curObj));
        return;
    }


});
sv.listen(80);




