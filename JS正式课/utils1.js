/**
 * Created by ajia on 16/5/25.
 */
~function () {
    var numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    var check = {};
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            check[key] = isType(numObj[key]);
        }
    }
    window.$t = window.check = check;
}()
console.log($t.isAry([]));
console.log($t.isReg(/^$/));