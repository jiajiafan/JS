//1、创建一个Ajax对象(在IE5~6浏览器中不兼容)
var xhr = new XMLHttpRequest;

//2、打开请求数据的URL地址:[HTTP METHOD]请求方式、[URL]数据的URL地址、[SYNC/ASYNC]同步请求或者异步请求,默认是异步请求、[USER NAME]用户名、[USER PASS]用户密码,用户名和用户密码基本不用,因为服务器一般默认是允许全部的用户(匿名用户)进行访问的,只有服务器提供了特定的用户访问权限,才会提供对应的用户名和密码

//->[SYNC/ASYNC]:默认是异步TRUE,写FALSE是同步 (异步是不需要等到本次HTTP请求的事物完成,继续执行下面的其他操作代码;同步相反,必须等到HTTP事物彻底完成,才能执行下面的代码)
xhr.open("get", "/getAllList?a=1&b=2&c=3");//->http://192.168.0.5/getAllList前面域名不写,浏览器会自己把当前页面的前三部分(协议、域名、端口号)添加上

//3、发送请求:只有执行了send才算Ajax请求正式发起,HTTP通道才建立连接,之前代码仅仅是在编写代码而已,把一些准备工作做完
xhr.send(null);
//4、以上三步才是ajax请求数据的核心三步,执行上述三个步骤,我们就可以完成数据请求和响应阶段了,接下来监听的事件仅仅是用来获取响应的内容的
xhr.onreadystatechange = function () {
    //->xhr.readyState:当前ajax请求的状态码
    //0:UNSENT 未发送
    //1:OPENED 已经打开了请求的地址
    //2:HEADERS_RECEIVED 响应头信息已经接收了(此时我们就可以获取到服务器的时间了)
    //3:LOADING 正在接收响应主体的内容
    //4:DONE 响应主体的内容接收完成
    //console.log(xhr.readyState);//->2、3、4

    if (xhr.readyState === 2) {
        //->xhr.getResponseHeader:获取响应头信息
        console.log(new Date(xhr.getResponseHeader("Date")));//->获取服务器的时间,默认是格林尼治时间的字符串,我们需要转换为标准的北京时间
        //->在做倒计时案例中,我们需要获取服务器的时候,但是为了减少本机请求时候和最终得到时间之间的时间差,我们在readyState=2的时候就把服务器的时间获取到即可
    }

    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        //console.log(xhr.responseText);
    }
};



