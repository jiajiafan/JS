var http=require("http"),
        url=require("url"),
        fs=require('fs');
var sv=http.createServer(function(req,res){
    "use strict";
    var urlObj=url.parse(req.url,true),
            pathname=urlObj.pathname,
            query=urlObj.query;
    var reg=/\.(HTML|CSS|JS)/i;
    if(reg.test(pathname)){
        try{
            var suffix=reg.exec(pathname)[1].toUpperCase(),
                    suffixType="text/plian";
            switch(suffix){
                case "HTML":
                    suffixType="text/html";
                    break;
                case "CSS":
                    suffixType="text/css";
                    break;
                case "JS":
                    suffixType="text/javascript";
                    break;
            }
            var conFile=fs.readFileSync("."+pathname,"utf8");
            res.writeHead(200,{'content-type':+suffixType+";charset=utf-8;"});
            res.end(conFile);
        }catch(e){
            res.writeHead(404);
            res.end();
        }
        return;
    }
    if(pathname=="/getData"){
        var n=query["n"]|| 1,
                allData=JSON.parse(fs.readFileSync("./json/pageData.json","utf8")),
                ary=[];
        for(var i=(n-1)*10;i<n*10-1;i++){
            if(i>allData.length-1){
                break;
            }
            ary.push(allData[i]);
        }
        var obj={
            total:Math.ceil(allData.length/10),
            data:ary
        }
        res.writeHead(200,"content-type:application;charset=utf-8;");
        res.end(JSON.stringify(obj));
    }
});
sv.listen(44000,function(){
    "use strict";
    console.log("123");
})