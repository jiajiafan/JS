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
    var ary = curEle["myBind" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === fn) {
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on" + type,tempFn);
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

/*---------------------------------------------*/
function on(curEle, type, fn) {
    !curEle["myEvent" + type] ? curEle["myEvent" + type] = [] : null;
    var ary = curEle["myEvent" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
    }
    ary.push(fn);
    bind(curEle, type, run);
}

function off(curEle, type, fn) {
    var ary = curEle["myEvent" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (curFn === fn) {
                ary[i] = null;
                return;
            }
        }
    }
}

function run(ev) {
    ev = ev || window.event;
    if (!ev.target) {
        ev.target = ev.srcElement;
        ev.pageX = ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        ev.pageY = ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        ev.preventDefault = function () {
            ev.returnValue = false;
        };
        ev.stopPropagation = function () {
            ev.cancelBubble = true;
        };
    }
    var ary = this["myEvent" + ev.type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (typeof curFn === "function") {
                curFn.call(this, ev);
                continue;
            }
            //->我们在执行的时候把数组中非函数这一项给删除掉
            ary.splice(i, 1);
            i--;
        }
    }
}
