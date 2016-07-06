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

/*---------------------------------------------*/
//->on:向自定义事件池中增加方法(之前存储过就不在重新的存储)
function on(curEle, type, fn) {
    !curEle["myEvent" + type] ? curEle["myEvent" + type] = [] : null;
    var ary = curEle["myEvent" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
    }
    ary.push(fn);

    //->把run方法扔到内置的事件池中:而上面编写的bind方法已经解决了THIS和重复的问题,我们拿来直接的用即可
    bind(curEle,type,run);
}

//->off:从自定义事件池中移除方法
function off(curEle, type, fn) {
    var ary = curEle["myEvent" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (curFn === fn) {
                ary.splice(i, 1);
                return;
            }
        }
    }
}

//->run:唯一一个放在内置事件池中的方法,当它执行的时候,把自定义事件池存储的每一个方法都按照既定的顺序执行一遍
function run(ev) {
    ev = ev || window.event;
    if (!ev.target) {//->IE6~8
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

    //this->curEle
    var ary = this["myEvent" + ev.type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (typeof curFn === "function") {
                //->循环让每一个方法执行,并且让其THIS指向当前的元素,把事件对象传递给当前的这个函数
                curFn.call(this, ev);
            }
        }
    }
}























