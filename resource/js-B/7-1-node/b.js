//->在b中导入(require)a,这样就可以调取a中(module.exports)导出的方法了
var a = require("./a");

function fnb1() {
    console.log("fnb1");
}

function fnb2() {
    console.log("fnb2");
    a.fna1();
    a.fna2();
    a.fna3();
}

module.exports.fnb2 = fnb2;
