//->性能优化:第一次执行方法,我们一步步的判断是否兼容,从而使用兼容的方式创建出XHR,但是第二次在执行这个方法,由于浏览器还是之前的,我是不需要重新的一步步判断是否兼容了 ->"惰性封装编程思想(比较懒,能够少判断少执行绝对不会多执行)"实现我们的方法库的优化

//->思路第一次执行找到合适的操作创建出XHR,并且把createXHR方法重新覆盖,覆盖为只用特定的方法创建XHR
//例如:谷歌浏览器 第一次执行完成createXHR=function(){return new XMLHttpRequest;}
function createXHR() {
    //->首先把我们在不同浏览器中创建XHR的操作分成四个方法分别存在一个数组中
    var xhr = null,
        ary = [
            function () {
                return new XMLHttpRequest;
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }
        ];

    //->第二步：循环数组中的每一个方法,让这些方法执行,如果执行不出现错误,说明这个小方法可以在当前的浏览器中创建XHR,反之如果执行报错,说明不可以,我们则继续执行后续的方法...
    for (var i = 0, len = ary.length; i < len; i++) {
        var curFn = ary[i];
        try {
            xhr = curFn();
        } catch (e) {
            //->执行报错,继续验证数组中的下一个方法
            continue;
        }
        //->执行没有报错,不需要在验证后续的方法了,结束循环即可;除此之外,我们用当前的这个小方法把我们的大方法createXHR替换掉,第二次在执行createXHR这个方法,直接执行的就是我们的这小方法了
        createXHR = curFn;
        break;
    }
    return xhr;
}

console.log(createXHR);
var xhr1 = createXHR();
xhr1.open("get", "js/data.txt", true);
xhr1.send(null);
xhr1.onreadystatechange = function () {
    if (xhr1.readyState === 4 && /^2\d{2}$/.test(xhr1.status)) {
        console.log(xhr1.responseText);
    }
};

console.log(createXHR);
var xhr2 = createXHR();
xhr2.open("get", "js/data.txt", true);
xhr2.send(null);
xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && /^2\d{2}$/.test(xhr2.status)) {
        console.log(xhr2.responseText);
    }
};








