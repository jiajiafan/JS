var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var readFile = function (path, response) {
    fs.readFile(path, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('file not found');
            return;
        }
        response.writeHead(200);
        response.end(data);
    })
};

var server = http.createServer(function (request, response) {
    var urlObject = url.parse(request.url, true);
    console.log(urlObject.pathname);
    if (urlObject.pathname === '/cors') {
        response.writeHead(200, {
            //'Access-Control-Allow-Origin':'*'
            'Access-Control-Allow-Origin': 'http://localhost:63342'
        });
        response.end('hello cors');
    } else if (urlObject.pathname === '/ajax') {
        response.end('hello ajax');
    } else if (urlObject.pathname === '/jsonp') {
        var valName = urlObject.query.thisValNameIs;
        //response.end('var ' + valName + '="hello world";');
        response.end(valName + '("hello world");'); //=> b("hello world");
    } else {
        readFile(urlObject.pathname.slice(1), response);
    }

});
//max 65535
server.listen(12345, function () {
    console.log('server start')
});