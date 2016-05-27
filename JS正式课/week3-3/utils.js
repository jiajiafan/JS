var utils = (function () {
    /**
     * @param likeAry 类数组
     * @returns ary  新的数组
     */
    function listToArray(likeAry) {
        try {
            return [].slice.call(likeAry, 0);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i]
            }
            return ary;
        }

    }

    /**
     *
     * @param str  json字符串
     * @returns {Object} json对象
     */
    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    /**
     *
     * @param attr 13个盒子模型中的一个属性
     * @param value
     * @returns  要么是读取的值 ,要么是直接对scrollTop/scrollLeft设置值
     */
    function getWin(attr, value) {
        if (typeof  value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    /**
     *
     * @param ele  当前的元素
     * @param attr 属性名
     * @returns res attr属性名对应的属性值
     */
    function getCss(ele, attr) {
        var res = null, reg = null;
        if ("getComputedStyle" in window) {
            res = window.getComputedStyle(ele, null)[attr]
        } else {
            if (attr == "opacity") {
                res = ele.currentStyle["filter"];//alpha(opacity = 50.5)
                reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
                res = reg.test(res) ? RegExp.$1 / 100 : 1;
            } else {
                res = ele.currentStyle[attr];
            }
            reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
            return reg.test(res) ? parseFloat(res) : res;
        }
    }

    /**
     * @param ele  当前元素
     * ele到body的偏移量
     */
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (1) {
            if (!p || p == document.body) break;
            if (navigator.userAgent.indexOf("MSIE 8.0") == -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }

        return {l: l, t: t};
    }


    /**
     * 获得子元素节点,并且可以通过标记名指定子元素
     * @param ele
     * @param tagName
     * @returns {Array}
     */
    function getChildren(ele, tagName) {
        var children = ele.childNodes;
        var ary = [];
        if (typeof tagName == "undefined") {
            for (var i = 0; i < children.length; i++) {
                var curChild = children[i];
                if (curChild.nodeType == 1) {
                    ary.push(curChild);
                }
            }
        } else if (typeof tagName == "string") {
            for (var i = 0; i < children.length; i++) {
                var curChild = children[i];
                if (curChild.nodeType == 1 && curChild.nodeName.toLowerCase() == tagName.toLowerCase()) {
                    ary.push(curChild);
                }
            }
        } else {
            throw new Error("第二个参数类型错误");
        }
        return ary;
    }


    /**
     * 获得当前元素ele的哥哥元素节点
     * @param ele
     */
    function pre(ele) {
        if (ele.previousElementSibling) {
            return ele.previousElementSibling;
        }
        var prev = ele.previousSibling;
        while (prev) {
            if (prev.nodeType == 1) {
                return prev;
            }
            prev = prev.previousSibling;
        }
        return prev;
    }

    /**
     * 获得所有的哥哥元素节点
     * @param ele
     */
    function preAll(ele) {
        var prev = pre(ele); //哥哥元素节点
        var ary = [];
        while (prev) {
            ary.push(prev);
            prev = pre(prev);//再基于哥哥节点再去找哥哥节点
        }
        return ary;
    }

    function next(ele) {
        if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        }
        var nextNode = ele.nextSibling;
        while (nextNode) {
            if (nextNode.nodeType == 1) {
                return nextNode;
            }
            nextNode = nextNode.nextSibling;
        }
        return nextNode;
    }

    function nextAll(ele) {
        var nextNode = next(ele);
        var ary = [];
        while (nextNode) {
            ary[ary.length] = nextNode;
            nextNode = next(nextNode);
        }
        return ary;
    }

    /**
     * 相邻的兄弟节点:一个哥哥元素节点,一个弟弟元素节点
     * @param ele
     */
    function sibling(ele) {
        var ary = [];
        //首先判断哥哥元素节点(弟弟元素节点是否存在),存在的话就放在数组里
        var prev = pre(ele);
        var nextNode = next(ele);
        prev ? ary.push(prev) : null;
        nextNode ? ary.push(nextNode) : null;
        return ary;
    }

    /**
     * 获得所有的兄弟节点
     * @param ele
     */
    function siblings(ele) {
        return preAll(ele).concat(nextAll(ele));
    }

    /**
     * 获得第一个子元素节点
     * @param ele
     */
    function firstChild(ele) {
        var childNodes = getChildren(ele);
        return childNodes.length > 0 ? childNodes[0] : null
    }

    /**
     * 获得最后一个子元素节点
     * @param ele
     */
    function lastChild(ele) {
        var childNodes = getChildren(ele);
        return childNodes.length > 0 ? childNodes[childNodes.length - 1] : null
    }

    /**
     * 把newEle添加到container的起始位置
     * @param newEle
     * @param container
     */
    function prepend(newEle, container) {
        //先判断下是否有第一个子元素节点,如果有,则添加到第一个子元素节点之前,如果没有,则添加到末尾的位置
        var first = firstChild(container);
        first ? container.insertBefore(newEle, first) : container.appendChild(newEle);
    }

    /**
     * 把newEle插入到oldEle之后
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle, oldEle) {
        //首先获得oldEle之后的元素节点,如果存在,则插入其之前,如果不存在,则插入到最后的最后的位置
        var nextEle = next(oldEle);
        if (nextEle) {
            oldEle.parentNode.insertBefore(newEle, nextEle)
        } else {
            oldEle.parentNode.appendChild(newEle);//插入到oldEle父节点(容器)末尾位置
        }
    }

    /**
     * 判断ele是否有strClass这个类名
     * @param ele
     * @param className
     */
    function hasClass(ele,strClass){
        var reg = new RegExp("(^| +)"+strClass+"( +|$)","g");
        return reg.test(ele.className);
    }
    function addClass(ele,strClass){
        var aryName = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0; i < aryName.length; i++) {
            if (!hasClass(ele, aryName[i])) {
                ele.className += " " + aryName[i];
                
            }
        }
    }

    function removeClass(ele,strClass){
        var aryName = strClass.replace(/(^ +| +$)/g,"").split(/ +/g);
        for(var i = 0;i<aryName.length;i++){
            var curName = aryName[i];
            var reg = new RegExp("(^| +)"+curName+"( +|$)","g");
            if(reg.test(ele.className)){
                ele.className = ele.className.replace(reg," ");
            }
        }
    }
    return {
        listToArray: listToArray,
        toJSON: toJSON,
        getWin: getWin,
        getCss: getCss,
        offset: offset,
        getChildren : getChildren,
        pre : pre,
        preAll : preAll,
        next: next,
        nextAll :nextAll,
        sibling :sibling,
        siblings:siblings,
        firstChild:firstChild,
        lastChild : lastChild,
        prepend : prepend,
        insertAfter : insertAfter,
        addClass : addClass,
        removeClass : removeClass
    }
})();
