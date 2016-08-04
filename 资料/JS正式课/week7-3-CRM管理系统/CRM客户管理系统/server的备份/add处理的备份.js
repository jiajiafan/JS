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

    //->数据接口请求的处理
    var path = "./nodeModule/customInfo.json";//->我们存储数据文件的地址

    //->获取所有的客户信息
    if (pathname === "/getAllList") {
        var allList = fs.readFileSync(path, "utf8");
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(allList);
    }

    //->新增用户
    if (pathname === "/add") {
        //->首先需要获取到客户端通过POST请求传递给服务器端的数据(客户端是把内容放在请求主体中传递给服务器端的)
        var addTemp = "";
        req.addListener("data", function (postCon) {
            //->postCon:存储的就是请求主体的中的内容,但是默认不是字符串格式,而是BUFFER格式,所以为了得到字符串我们需要用addTemp这个空字符串和它进行拼接
            addTemp += postCon;
        });

        //->接下来把得到的数据写在JSON文件中:首先需要把原有的内容获取到,然后和我们的新内容进行拼接,最后在把全部的内容从新的放入文件中
        req.addListener('end', function () {
            var con = fs.readFileSync(path, "utf8");//->string格式的
            con = JSON.parse(con);
            addTemp = JSON.parse(addTemp);

            //->客户端传递给我们的数据中并没有ID这一项,这一项的值需要我们自己获取到:获取原有客户中最后一个客户的ID值,新客户的ID是在这个ID的基础上加一即可(但是如果之前一项都没有,我们这一项的ID就是1)
            if (con.length === 0) {
                addTemp["id"] = 1;
            } else {
                addTemp["id"] = parseFloat(con[con.length - 1]["id"]) + 1;
            }
            con.push(addTemp);//->此时的con把原有的和最新的都存放在一起了(JSON格式的数据),接下来我们就把最新的con中的内容重新的写入到文件中即可

            fs.writeFileSync(path, JSON.stringify(con));//->我们写入的内容应该是一个字符串格式

            //->返回给客户端对应的结果:成功或者失败
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify({
                "code": 0,
                "message": "创建成功!"
            }));
        });
    }


});
sv.listen(80);




