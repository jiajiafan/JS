Function.prototype.myBind = function myBind(context) {
    if ("bind" in Function.prototype) {
        return this.bind.apply(this, arguments);
    }
    //->IE6~8
    var _this = this;
    var outerArg = [].slice.call(arguments, 1);
    return function () {
        var innerArg = [].slice.call(arguments, 0);
        _this.apply(context, outerArg.concat(innerArg));
    }
};

/*
 * bind：DOM2 event binding, compatible with all browsers, solved the problem of THIS and duplication
 * @param curEle [object] ->Elements to be operated at
 * @param type [string] ->Event type that needs to be bound
 * @param fn [function] ->Method to bind
 * by Team on 2016/06/02
 */
function bind(curEle, type, fn) {
    if (document.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    //->自己创建一个临时存储的容器:没有才创建,有的话就不需要重复的创建了
    !curEle["myBind" + type] ? curEle["myBind" + type] = [] : null;

    //->把需要绑定的方法进行画妆:其实就是在调用myBind方法进行THIS的预处理操作;我们还需要把化妆前的照片贴在tempFn身上,这样以后只需要拿之前的照片一个个对比,就可以把其化妆后的结果找到了
    var tempFn = fn.myBind(curEle);
    tempFn.photo = fn;

    //->把画完妆的结果放在自己的容器及内置的事件池中各一份
    var ary = curEle["myBind" + type];

    //->顺便解决一下重复问题:在存储之前,首先看一下之前是否存储过,存储过的话就不在存储了即可
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === fn) {
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on" + type, tempFn);
}

function unbind(curEle, type, fn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    //->拿传递进来的函数到自己的容器中找到化妆后的结果,然后分别的在自己的容器中和内置事件池中把找到的结果都依次的移除
    var ary = curEle["myBind" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var tempFn = ary[i];
            if (tempFn.photo === fn) {
                curEle.detachEvent("on" + type, tempFn);
                ary.splice(i, 1);
                break;
            }
        }
    }
}


























