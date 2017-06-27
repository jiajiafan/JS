//1、关于JS的同步编程和异步编程
//var xhr = new XMLHttpRequest;
//xhr.open("get", "js/data.txt", true);
//xhr.send(null);
//xhr.onreadystatechange = function () {
//    if (xhr.readyState === 2) {
//        console.log(xhr.getResponseHeader("Date"));
//    }
//    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//        console.log(xhr.responseText);
//    }
//};

//->同步编程
//var xhr = new XMLHttpRequest;
//xhr.open("get", "js/data.txt", false);
//xhr.send(null);//->只有当执行send之后,我们的HTTP事物才开始,在这里我们使用的是同步编程,所以只有当服务器响应成功(readyState=4)后才会执行后续操作
////上述操作需要13.74ms才可以完成，在这段时间内不执行后续的代码，当上述任务完成，此时的xhr.readyState已经变为4了
////console.log(xhr.readyState);//->4
//
////->上述操作彻底完成后,我给Ajax的onreadystatechange事件绑定一个方法,当状态改变触发事件执行方法(但是此时的readyState已经变为4了,我们的状态码不会在改变,绑定的方法也不会在执行了)
//xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//        console.log(xhr.responseText);
//    }
//};

//->处理:如果Ajax使用的是同步编程,我们必须把xhr.send放在xhr.onreadystatechange后面
//var xhr = new XMLHttpRequest;
//xhr.open("get", "js/data.txt", false);
//xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//        console.log(xhr.responseText);
//    }
//};
//xhr.send(null);

//var xhr = new XMLHttpRequest;
//xhr.open("get", "js/data.txt", false);
//xhr.send(null);//->当HTTP事物完成,readyState肯定已经为4了
//if (/^2\d{2}$/.test(xhr.status)) {
//    console.log(xhr.responseText);
//}

//var xhr = new XMLHttpRequest;
//xhr.open("get", "js/data.txt", false);
//xhr.onreadystatechange = function () {
//    console.log(xhr.readyState);//->4
//    //->同步Ajax请求我们无法监听到xhr.readyState === 2的时候的操作,所有无法获取服务器的时间
//    if (xhr.readyState === 2) {
//        console.log(xhr.getResponseHeader("Date"));
//    }
//
//    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//        console.log(xhr.responseText);
//    }
//};
//xhr.send(null);

//->对于HTTP报文的操作
//var xhr = new XMLHttpRequest;
////xhr.setRequestHeader() ->客户端设置请求头信息
//xhr.open("get", "js/data.txt", true);
//xhr.send(null);
//xhr.onreadystatechange = function () {
//    //xhr.getResponseHeader() ->客户端获取响应头信息
//    if (xhr.readyState === 2) {
//        console.log(xhr.getResponseHeader("Date"));
//    }
//    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//        console.log(xhr.responseText);
//    }
//};

//->性能优化:第一次执行方法,我们一步步的判断是否兼容,从而使用兼容的方式创建出XHR,但是第二次在执行这个方法,由于浏览器还是之前的,我是不需要重新的一步步判断是否兼容了 ->"惰性封装编程思想(比较懒,能够少判断少执行绝对不会多执行)"实现我们的方法库的优化

//->思路第一次执行找到合适的操作创建出XHR,并且把createXHR方法重新覆盖,覆盖为只用特定的方法创建XHR
//例如:谷歌浏览器 第一次执行完成createXHR=function(){return new XMLHttpRequest;}
function createXHR() {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {//->IE5~6
        try {
            if (new ActiveXObject("Microsoft.XMLHTTP")) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } catch (e) {

        }

        try {
            if (new ActiveXObject("Msxml2.XMLHTTP")) {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
        } catch (e) {

        }

        try {
            if (new ActiveXObject("Msxml3.XMLHTTP")) {
                xhr = new ActiveXObject("Msxml3.XMLHTTP");
            }
        } catch (e) {

        }
    }
    return xhr;
}

//->关于创建Ajax对象的兼容问题:new XMLHttpRequest在IE5~6浏览器中不支持
var xhr1 = createXHR();
xhr1.open("get", "js/data.txt", true);
xhr1.send(null);
xhr1.onreadystatechange = function () {
    if (xhr1.readyState === 4 && /^2\d{2}$/.test(xhr1.status)) {
        console.log(xhr1.responseText);
    }
};


var xhr2 = createXHR();
xhr2.open("get", "js/data.txt", true);
xhr2.send(null);
xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && /^2\d{2}$/.test(xhr2.status)) {
        console.log(xhr2.responseText);
    }
};








