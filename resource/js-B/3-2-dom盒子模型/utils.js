var utils = (function () {
    return {
        /**
         *
         * @param likeArray  类数组
         * @returns ary 数组
         */
        listToArray: function (likeArray) {
            try {
                return [].slice.call(likeArray, 0)
            } catch (e) {
                var ary = [];
                for (var i = 0; i < likeArray.length; i++) {
                    ary[ary.length] = likeArray[i];
                }
                return ary;
            }
        },
        toJson: function (str) {
            return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
        },
        getCss: function (ele, attr) {
            var res = null, reg = null;
            if ("getComputedStyle" in window) {
                res = window.getComputedStyle(ele, null)[attr];
            } else {
                if (attr == "opacity") {
                    //alpha(opacity = 50)
                    var str = ele.currentStyle["filter"];
                    var reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
                    res = reg.test(str) ? RegExp.$1/100 : 1;
                } else {
                    res = ele.currentStyle[attr];
                }
            }
            reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
            return reg.test(res) ? parseFloat(res) : res;
        },
        getWin : function(attr,value){
            if(typeof value == "undefined"){
                return document.documentElement[attr]||document.body[attr]
            }
            document.documentElement[attr] = value;
            document.body[attr] = value;

        }
    }


})()