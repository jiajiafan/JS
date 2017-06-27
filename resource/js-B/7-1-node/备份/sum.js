//->sum模块
function sum() {
    var total = null;
    for (var i = 0, len = arguments.length; i < len; i++) {
        var cur = Number(arguments[i]);
        if (!isNaN(cur)) {
            total += cur;
        }
    }
    return total;
}
//->我们每一个自定义模块中编写的方法都是私有的方法,不同的模块中的方法名如果相同的话,是不会冲突的
//->如果其他的模块想要调取本模块的方法,通过require只是把模块导入进来了,但是sum中提供的这些方法还不能供其他的模块调用,想要供其他的模块调用,还需要在sum中导出:

//->module:是NODE天生自带的属性
//->module.exports:是NODE天生自带的属性,它是一个对象数据类型值,包含了我们所需要共外面使用的所的方法
module.exports.sum = sum;