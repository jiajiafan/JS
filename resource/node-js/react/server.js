var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.resolve()));
app.get('/su',function(req,res){
    var cb = req.query.cb;//函数名称
    var wd = req.query.wd;//查询关键字 i
    var result = {q:wd,p:false,s:[]};
    for(var i=0;i<10;i++){
        result.s.push(wd+i);
    }
    res.send(cb+'('+JSON.stringify(result)+')');
});
app.listen(8080);