var strF="赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨";
var strT="一二三四五六七八九";
function getRandom(n,m){
    "use strict";
    return Math.round(Math.random()*(m-n)+n);
}
var ary=[];
for(var i=1;i<86;i++){
    var obj={};
    obj["num"]=i<10?"00"+i:"0"+i;
    obj["name"]=strF.charAt(getRandom(0,15))+strT.charAt(getRandom(0,8));
    obj["sex"]=getRandom(0,1);
    obj["score"]=getRandom(10,99);
    ary.push(obj);
}
console.log(JSON.stringify(ary));