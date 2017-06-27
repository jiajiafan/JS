//->computed模块

//1、在computed这个模块中调取sum模块中的方法

//->首先把我们的sum模块导入到当前的模块中(require),s是给导入的模块起的一个别名,以后的s代表sum这个模块：./当前项目的根目录   ../返回上一级目录
var s = require("./sum");

//->调取模块中提供的API接口方法,实现相关的功能即可
var total = s.sum(1, 2, 3, 4);
console.log(total);
