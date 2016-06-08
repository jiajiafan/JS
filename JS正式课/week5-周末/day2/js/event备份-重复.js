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

function bind(curEle, type, fn) {
    if (curEle.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    var tempFn = fn.myBind(curEle);
    tempFn.photo = fn;
    !curEle["myBind" + type] ? curEle["myBind" + type] = [] : null;
    //->重复问题:如果之前在自己的容器中已经存储过了,我们就不在重新的存储了
    var ary = curEle["myBind" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === fn) {
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on" + type, tempFn);
}

function unbind(curEle, type, fn) {
    if (curEle.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    var ary = curEle["myBind" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (curFn.photo === fn) {
                curEle.detachEvent("on" + type, curFn);
                ary.splice(i, 1);
                break;
            }
        }
    }
}

