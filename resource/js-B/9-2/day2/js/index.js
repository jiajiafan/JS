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

//->动态计算REM的值
document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 100 + "px";

//->头部和导航区域的点击事件
$(function () {
    var $menu = $(".menu"),
        $nav = $(".nav"),
        $oLis = $nav.find("li"),
        $navBtn = $nav.find(".navBtn");

    //->头部的MENU按钮
    var menuFlag = false;
    $menu.singleTap(function () {
        if (!menuFlag) {//->当前是隐藏的我让其显示
            $nav.css("display", "block").removeClass("move2").addClass("move");
            menuFlag = true;
            return;
        }
        //->当前是显示的我让其隐藏
        $nav.removeClass("move").addClass("move2");
        window.setTimeout(function () {
            $nav.css("display", "none");
        }, 200);
        menuFlag = false;
    });

    //->找到中间的LI让他们隐藏
    var $partAry = [];
    $oLis.each(function (index, curLi) {
        if (index >= 6 && index <= 11) {
            $(curLi).css("display", "none");
            $partAry.push(curLi);
        }
    });

    //->LI中的展开和收起
    $navBtn.attr("navFlag", "false");
    $navBtn.singleTap(function () {
        var navFlag = $navBtn.attr("navFlag");
        if (navFlag === "false") {
            $.each($partAry, function (index, curLi) {
                $(curLi).css("display", "block");
            });
            $navBtn.attr("navFlag", "true").removeClass("hide").children("a").html("收起");
            return;
        }
        $.each($partAry, function (index, curLi) {
            $(curLi).css("display", "none");
        });
        $navBtn.attr("navFlag", "false").addClass("hide").children("a").html("展开");
    });
});

//->支持区域的数据绑定和业务处理
$(function () {
    var $support = $(".support"),
        rightNum = 0,
        leftNum = 0,
        $count = null;

    var $sup = null,
        $supList = null;

    //->每一次加载页面之前我们先判断之前是否已经存储过数据,并且存储的时间是否还在有效期内,如果还在有效期内,我们不需要重新的请求新的数据了
    var matchStorage = localStorage.getItem("matchStorage");
    if (matchStorage) {
        matchStorage = JSON.parse(matchStorage);
        var time = matchStorage["time"];
        if (new Date().getTime() - time <= 60000) {
            callback(matchStorage["data"]);
            return;
        }
    }
    $.ajax({
        url: "http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1468531",
        type: "get",
        dataType: "jsonp",
        success: callback
    });

    function callback(jsonData) {
        var str = '';
        if (jsonData && jsonData[1]) {
            var data = jsonData[1],
                matchInfo = data["matchInfo"];

            str += '<div class="teamInfo">';
            str += '<div class="home"><img src="' + matchInfo["leftBadge"] + '"/><span>' + matchInfo["leftGoal"] + '</span></div>';
            str += '<span>' + matchInfo["startTime"].myFormatTime("{1}月{2}日 {3}:{4}") + '</span>';
            str += '<div class="away"><span>' + matchInfo["rightGoal"] + '</span><img src="' + matchInfo["rightBadge"] + '"/></div>';
            str += '</div>';

            str += '<div class="count"><span></span></div>';

            str += '<div class="sup">';
            str += '<span dir="left">' + data["leftSupport"] + '</span>';
            str += '<span>' + matchInfo["matchDesc"] + '</span>';
            str += '<span dir="right">' + data["rightSupport"] + '</span>';
            str += '</div>';

            leftNum = parseFloat(data["leftSupport"]);
            rightNum = parseFloat(data["rightSupport"]);
        }
        $support.html(str);

        //->把本次请求回来的数据存储到本地
        var matchStorage = {
            time: new Date().getTime(),
            data: jsonData
        };
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));

        //->默认显示对应的进度条
        $count = $support.children(".count");
        $count.children("span").css("width", (leftNum / (leftNum + rightNum)) * 100 + "%");

        //->绑定支持的事件：首先需要判断之前是否存储过,如果存储过我们就不在绑定
        $sup = $support.children(".sup");
        $supList = $sup.children("span");
        var storageInfo = localStorage.getItem("storageInfo");
        if (storageInfo) {
            storageInfo = JSON.parse(storageInfo);
            var touchDir = storageInfo["touchDir"];
            if (touchDir === "left") {
                $supList.eq(0).addClass("bg");
            } else {
                $supList.eq(2).addClass("bg");
            }
        } else {
            $supList.eq(0).singleTap(supportFn);
            $supList.eq(2).singleTap(supportFn);
        }
    }

    function supportFn() {
        if ($sup.attr("isTouch") === "ok") {
            return;
        }
        $sup.attr("isTouch", "ok");
        var oldNum = parseFloat($(this).html());
        $(this).html(oldNum + 1).addClass("bg").siblings().removeClass("bg");

        //->点击完成后需要进行本地存储
        var storageInfo = {
            isTouch: "ok",
            touchDir: $(this).attr("dir")
        };
        localStorage.setItem("storageInfo", JSON.stringify(storageInfo));

        //->向后台的服务器发送请求告诉它我点击的是哪一个
        var t = $(this).attr("dir") === "left" ? 1 : 2;
        $.ajax({
            url: "http://matchweb.sports.qq.com/kbs/teamSupport?mid=100000:1468531&type=" + t,
            type: "get",
            dataType: "jsonp"
        });
    }
});