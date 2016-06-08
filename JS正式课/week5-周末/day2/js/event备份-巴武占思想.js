~function (pro) {
    function bind(context) {
        if ("bind" in pro) {
            return this.bind.apply(this, arguments);
        }
        var _this = this,
            outerArg = [].slice.call(arguments, 1);
        return function () {
            var innerArg = [].slice.call(arguments, 0);
            _this.apply(context, outerArg.concat(innerArg));
        }
    }

    pro.myBind = bind;
}(Function.prototype);

//->巴武占思想
function bind(curEle, type, fn) {
    if (curEle.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    var tempFn = fn.myBind(curEle);
    !curEle["myBind" + type] ? curEle["myBind" + type] = {} : null;
    var obj = curEle["myBind" + type];
    if (obj[fn.name]) {
        return;
    }
    obj[fn.name] = tempFn;
    curEle.attachEvent("on" + type, tempFn);
}

function unbind(curEle, type, fn) {
    if (curEle.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    var obj = curEle["myBind" + type];
    if (obj) {
        var tempFn = obj[fn.name];
        if (tempFn) {
            curEle.detachEvent("on" + type, tempFn);
            delete obj[fn.name];
        }
    }
}