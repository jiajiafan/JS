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
//bind(oDiv, "click", fn1);
//bind(oDiv, "click", fn2);
//bind(oDiv, "click", fn3);

function bind(curEle, type, fn) {
    if (curEle.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    var tempFn = fn.myBind(curEle);//->把方法进行化妆:预处理THIS指向当前元素
    tempFn.photo = fn;//->在化妆完成的结果上把之前的照片贴在身上,以后我只要拿着之前的照片就可以找到对应化妆后的结果

    !curEle["myBind" + type] ? curEle["myBind" + type] = [] : null;//->没有容器的话我自己创建一个容器
    curEle["myBind" + type].push(tempFn);//->把化妆后的结果存储到自己的容器中

    curEle.attachEvent("on" + type, tempFn);//->把化妆后的结果存储到内置事件池中一份
}

function unbind(curEle, type, fn) {
    if (curEle.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    //->移除的时候：首先拿方法到自己的容器中找到其化妆后的结果A,然后在内置的事件池中把A移除掉,然后在自己的容器中也把A移除掉
    var ary = curEle["myBind" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            if (curFn.photo === fn) {//->化妆结果身上存储的照片和我即将要删除的函数一样，curFn就是我想要找到的化妆后的结果
                curEle.detachEvent("on" + type, curFn);
                ary.splice(i, 1);
                break;
            }
        }
    }
}

