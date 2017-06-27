//->server.js这个模块是用来构建服务器端服务的,根据客户端的不同请求,把对应的数据和内容返回给客户端进行渲染(我们项目中都把server.js放在项目的根目录中)

var http = require("http");//->导入内置模块

//->创建一个服务(server这个变量存储的就是我们创建出来的这个服务)
//->传递进来的那个匿名回调函数,会在每一次接收到客户端请求的时候执行(只要客户端向这个服务发送一个请求,那么我们的回调函数就会执行一次)
var server = http.createServer(function (request, response) {
    //->request:存储的是客户端的全部请求信息
    //->response:提供一些方法供服务器端向客户端响应数据

    response.writeHead(200, {'content-type': 'text/plain;charset=utf-8;'});//->重写响应头信息(在编写返回内容的格式等相关点):200->网络状态码,代表响应成功 第二个对象参数就是重写响应头信息,在这里我只是重写了一个content-type(响应内容的类型及编码) 'text/plain(说明响应的内容是纯文本);charset=utf-8(采用的是UTF-8编码格式);'
    response.write("hello world!");//->向客户端写(返回)数据
    response.write("hello 北京!");
    response.write("hello 钱包!");
    response.end();//->结束向客户端的响应(不在向客户端返回数据了)
});

//->在这个服务的基础上监听一个端口(HTTP协议默认的端口是80 HTTPS协议默认端口是443 FTP协议默认的端口是21 端口号的范围是0~65535)
//->回调函数:当服务创建成功,并监听了一个对应的端口,说明一切就绪,此时执行当前的回调函数
server.listen(80, function () {
    console.log("http server is success,listen in 80 port!");
});









