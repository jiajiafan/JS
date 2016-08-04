var n = 1, total = 0;
var $bindPlan = $.Callbacks();//->在发布一个计划,$bindPlan存在几个常用方法:add是向计划表中追加方法 remove是从计划表中移除方法 fire触发计划中的方法按照顺序执行

//->绑定列表区域的数据
function bindList(data) {
    var str = '';
    $.each(data, function (index, curData) {
        var sex = curData["sex"] == 1 ? "女" : "男";
        //->在绑定数据的时候就把num存储到自己的自定义属性上,以后想要使用num直接的到自定义属性上获取即可
        str += '<li num="' + curData["num"] + '" name="' + curData["name"] + '">';
        str += '<span>' + curData["num"] + '</span>';
        str += '<span>' + curData["name"] + '</span>';
        str += '<span>' + sex + '</span>';
        str += '<span>' + curData["score"] + '</span>';
        str += '</li>';
    });
    $(".boxList").html(str);
}
$bindPlan.add(bindList);

//->绑定分页区域的数据
function bindPage() {
    var str = '';
    for (var i = 1; i <= total; i++) {
        str += '<li>' + i + '</li>';
    }
    $("#pageList").html(str);

    //->执行一次即可
    $bindPlan.remove(arguments.callee);
}
$bindPlan.add(bindPage);

//->让当前页码选中
function checkBg() {
    /*$("#pageList").children("li").each(function (index, curLi) {
     //->this就是curLi
     if ((index + 1) == n) {
     $(this).addClass("bg");
     } else {
     $(this).removeClass("bg");
     }
     });*/
    $("#pageList").children("li").eq(n - 1).addClass("bg").siblings().removeClass("bg");
}
$bindPlan.add(checkBg);

//->让文本框中显示当前的页码:计划中绑定匿名函数会导致以后无法移除
$bindPlan.add(function () {
    $("#search").val(n);
});


//->给分页区域的按钮绑定点击事件
function bindEvent() {
    //->delegate是jQuery中专门用来处理事件委托的方法
    $(".boxBtn").delegate("span", "click", function () {
        var inn = $(this).html();
        if (inn === "FIRST") {
            if (n == 1) {
                return;
            }
            n = 1;
        }
        if (inn === "LAST") {
            if (n == total) {
                return;
            }
            n = total;
        }
        if (inn === "PREV") {
            if (n == 1) {
                return;
            }
            n--;
        }
        if (inn === "NEXT") {
            if (n == total) {
                return;
            }
            n++;
        }
        sendAjax();
    }).delegate("li", "click", function () {
        var inn = parseFloat($(this).html());
        if (inn == n) {
            return;
        }
        n = inn;
        sendAjax();
    });

    //->给元素的事件绑定方法这件事只需要在加载页面的时候执行一次即可,以后在触发这个计划表的时候不需要重新的绑定,所以第一次执行完成后我们只需要把这个方法在计划表中移除即可
    $bindPlan.remove(bindEvent);
}
$bindPlan.add(bindEvent);

//->给列表区域的每一条记录绑定点击事件
function bindLink() {
    $(".boxList").on("click", function (ev) {
        var tar = ev.target,
            $tar = $(tar),
            tarTag = tar.tagName.toUpperCase();
        if (tarTag === "SPAN") {
            tar = ev.target.parentNode;
            $tar = $(tar);
        }
        //->通过以上操纵已经确定TAR或者$TAR都指的是当前的LI
        //->在页面跳转的时候需要获取到当前LI所代表的学号,把学号传给详细页,所以需要之前绑定的时候就把学号保存在当前LI的自定义属性上
        //window.location.href = "/detail.html?num=" + $tar.attr("num");

        //var para = "num=" + $tar.attr("num") + "&name=" + $tar.attr("name");
        //para = encodeURIComponent(para);

        var para = "num=" + $tar.attr("num") + "&name=" + escape($tar.attr("name"));
        window.open("/detail.html?" + para);

        //->window.location.href:在当前页面基础上打开一个新的页面(当前页会关闭)
        //->window.open():在新窗口打开新页面,当前页面不会关闭
    });

    //->本方法执行一次即可
    $bindPlan.remove(arguments.callee);
}
$bindPlan.add(bindLink);


function sendAjax() {
    $.ajax({
        url: "/getData?n=" + n,
        type: "get",
        dataType: "json",
        cache: false,//->当前请求是否走缓存,默认是true:走缓存,false:不走缓存,原理其实就是在get请求的url地址末尾追加一个随机数
        success: function (jsonData) {
            if (jsonData) {
                total = jsonData["total"];
                $bindPlan.fire(jsonData["data"]);
            }
        }
    });
}
sendAjax();