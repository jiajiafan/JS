~function (pro) {
    pro.myFormatTime = myFormatTime;
    function myFormatTime(template) {
        var res = null,
            ary = this.match(/\d+/g);
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        res = template.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            !val ? val = "00" : null;
            val.length < 2 ? val = "0" + val : null;
            return val;
        });
        return res;
    }
}(String.prototype);


//->让左侧导航实现局部滚动(ISCROLL)
var $navScroll = new IScroll("#nav", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});

//->让右侧区域实现局部滚动
var $hotScroll = new IScroll("#hot", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});

//->重置滚动条的样式
var $content = $("#nav,#hot"),
    $contentBars = $(".iScrollVerticalScrollbar");
/*$content.on("mouseover", function () {
 $(this).children(".iScrollVerticalScrollbar").css({
 display: "block"
 });
 }).on("mouseout", function () {
 $(this).children(".iScrollVerticalScrollbar").css({
 display: "none"
 });
 });*/

//->头部导航下载区域的展开和收起
$(function () {
    $(".header .downLoad").on("mouseover", function () {
        $(this).children(".code,.iframeBg").css({
            height: 179
        });
    }).on("mouseout", function () {
        $(this).children(".code,.iframeBg").css({
            height: 0
        });
    });
});

//->JS控制SECTION区域的高度
$(function () {
    //->通过jQuery的css方法获取的结果是加上单位的,我们计算的话需要把单位去除掉
    change();
    function change() {
        var $section = $(".section");
        var curH = $(window).outerHeight() - $(".header").outerHeight() - parseFloat($section.css("marginTop")) - parseFloat($section.css("marginBottom"));
        $section.css({
            height: curH
        });

        //->在当前区域的高度发生改变的时候需要把所有经过ISCROLL处理的区域进行刷新&&把生成的滚动条样式进行重写
        $navScroll.refresh();
        $hotScroll.refresh();
        $contentBars.css({
            opacity: 0.3
        });
    }

    $(window).on("resize", change);
});

//->绑定热门赛事区域中的内容
function bindHTML(data, title) {
    var str = '';
    if (data && data.length > 0) {
        str += '<h2><i></i>' + title + '</h2>';
        str += '<ul>';
        $.each(data, function (index, curData) {
            var mt = curData["matchType"];
            if (mt == 4) {
                //->所有的综合特殊赛事我们先过滤掉,因为没有写对应的HTML结构
                return;
            }
            str += '<li>';
            str += '<div class="detail">';
            str += '<span class="d1">' + curData["matchDesc"] + '</span>';
            str += '<span class="d2">' + curData["startTime"].myFormatTime("{1}-{2} {3}:{4}") + '</span>';
            str += '<img src="' + curData["leftBadge"] + '" alt="" class="d7"/>';
            str += '<span class="d3">' + curData["leftName"] + '</span>';
            str += '<span class="d4">' + curData["leftGoal"] + '-' + curData["rightGoal"] + '</span>';
            str += '<span class="d5">' + curData["rightName"] + '</span>';
            str += '<img src="' + curData["rightBadge"] + '" alt="" class="d8"/>';
            str += '<span class="d6">' + (mt == 1 ? "图文直播" : (mt == 2 ? "直播中 " : "视频回顾")) + '</span>';
            str += '</div>';

            var ad = curData["ad"];
            if (ad) {
                str += '<div class="last">';
                str += '<span class="one">' + ad["tag"] + ':</span>';
                str += '<span>' + ad["desc"] + '</span>';
                str += '</div>';
            }
            str += '</li>';
        });
        str += '</ul>';
    }
    return str;
}
$(function () {
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/hotMatchList",
        type: "get",
        dataType: "jsonp",
        jsonpCallback: "getHotMatchList",
        success: function (jsonData) {
            var $hot = $("#hot"),
                $living = $hot.find(".living"),
                $ending = $hot.find(".ending"),
                $preing = $hot.find(".preing");
            var data = jsonData["data"];
            data["on"] && data["on"].length > 0 ? $living.html(bindHTML(data["on"], "直播中")) : $living.remove();
            data["after"] && data["after"].length > 0 ? $ending.html(bindHTML(data["after"], "已结束")) : $ending.remove();
            data["pre"] && data["pre"].length > 0 ? $preing.html(bindHTML(data["pre"], "未开始")) : $preing.remove();

            //->重新刷新
            $hotScroll.refresh();
        }
    });
});


