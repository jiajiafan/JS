var ary = [{
    id: 1,
    name: "xxx"
}];
var obj = {id: 1, name: "yyy"};

for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];//->cur=xxxfff000
    if (cur["id"] == obj["id"]) {
        //cur = obj;//->cur=xxxfff111
        ary.splice(i, 1, obj);
        break;
    }
}

//var a={};
//var b=a;//->b=xxxfff000
//b={name:"hahah"};//->b=xxxfff111

console.dir(ary);