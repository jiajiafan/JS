//->以后做滑动效果首先需要把document滑动的默认行为组织掉
$(document).on("touchmove", function (ev) {
    ev.preventDefault();
});

//->动态计算REM的根值
document.documentElement.style.fontSize = document.documentElement.clientWidth / 720 * 100 + "px";

//->轮播图区域的图片需要进行延迟加载
$(function () {
    var lazyTimer = window.setTimeout(function () {
        window.clearTimeout(lazyTimer);
        $(".wrap img").each(function (index, curImg) {
            //->this====curImg
            var $oImg = $(new Image);
            $oImg.attr("src", $(this).attr("data-src"));
            $oImg.on("load", function () {
                $(curImg).attr("src", $(this).attr("src")).css("display", "block");
            });
        });
    }, 500);
});

//->WRAP以及其底下子元素的宽度都需要进行动态的设置
$(function () {
    var curW = document.documentElement.clientWidth;
    var $wrap = $(".wrap"),
        $wrapDivList = $wrap.children("div"),
        $wrapFir = $wrapDivList.eq(0),
        $wrapLast = $wrapDivList.eq($wrapDivList.length - 1);
    $wrapFir.clone(true).appendTo($wrap);
    $wrapLast.clone(true).prependTo($wrap);

    //->重新计算本区域元素的宽度
    $wrapDivList = $wrap.children("div");
    $wrapDivList.css("width", curW);
    $wrap[0].style.webkitTransitionDuration = "0s";
    $wrap.css({
        width: $wrapDivList.length * curW,
        left: -curW
    });
});

//->开始我们的核心操作:轮播
$(function () {
    var curW = document.documentElement.clientWidth;
    var $banner = $(".banner"),
        $wrap = $(".wrap"),
        $wrapDivList = $wrap.children("div"),
        $tipList = $banner.find("li");

    var step = 1,
        count = $wrapDivList.length,
        interval = 2000,
        autoTimer = null,
        pauseTime = null;

    //->实现焦点对齐
    function changeBg() {
        var temp = step;
        temp === 0 ? temp = 3 : null;
        temp === 4 ? temp = 1 : null;
        $tipList.eq(temp - 1).addClass("bg").siblings().removeClass("bg");
    }

    //->实现自动轮播
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        step++;
        $wrap[0].style.webkitTransitionDuration = "0.3s";
        $wrap.css("left", -step * curW);
        changeBg();

        if (step === count - 1) {
            var delayTimer = window.setTimeout(function () {
                window.clearTimeout(delayTimer);
                step = 1;
                $wrap[0].style.webkitTransitionDuration = "0s";
                $wrap.css("left", -step * curW);
            }, 300);
        }
    }

    //->实现左右切换轮播
    $banner.on("touchstart", moveStart).on("touchmove", moving).on("touchend", moveEnd);

    function moveStart(ev) {
        //->触摸的时候结束自动轮播
        window.clearInterval(autoTimer);
        window.clearTimeout(pauseTime);
        var point = ev.touches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            strL: parseFloat($wrap.css("left"))
        });
    }

    function moving(ev) {
        var point = ev.touches[0];
        var strX = parseFloat($(this).attr("strX")),
            strY = parseFloat($(this).attr("strY")),
            strL = parseFloat($(this).attr("strL")),
            endX = point.clientX,
            endY = point.clientY,
            changeX = endX - strX,
            flag = isSwipe(strX, endX, strY, endY),//->是否发生了滑动
            dir = swipeDir(strX, endX, strY, endY);//->滑动的方向

        //->只有是滑动并且是左右滑我们才会做一些处理
        if (flag && /(right|left)/i.test(dir)) {
            var curL = strL + changeX;
            //->防止过快滑动我们做边界判断
            curL = curL < -(count-1) * curW ? -(count-1) * curW : (curL > 0 ? 0 : curL);
            $wrap[0].style.webkitTransitionDuration = "0s";
            $wrap.css("left", curL);
        }
        $(this).attr({
            changeX: changeX,
            flag: flag,
            dir: dir
        });
    }

    function moveEnd(ev) {
        var flag = $(this).attr("flag"),
            dir = $(this).attr("dir"),
            changeX = parseFloat($(this).attr("changeX"));
        if (flag == "true" && /(right|left)/i.test(dir)) {
            Math.abs(changeX) >= curW / 3 ? (dir === "left" ? step++ : step--) : null;
            $wrap[0].style.webkitTransitionDuration = "0.3s";
            $wrap.css("left", -step * curW);
            changeBg();

            //->边界判断
            var delayTimer = null;
            if (dir === "left") {//->右边界
                if (step === count - 1) {
                    delayTimer = window.setTimeout(function () {
                        window.clearTimeout(delayTimer);
                        step = 1;
                        $wrap[0].style.webkitTransitionDuration = "0s";
                        $wrap.css("left", -step * curW);
                    }, 300);
                }
            }
            if (dir === "right") {//->左边界
                if (step === 0) {
                    delayTimer = window.setTimeout(function () {
                        window.clearTimeout(delayTimer);
                        step = count - 2;
                        $wrap[0].style.webkitTransitionDuration = "0s";
                        $wrap.css("left", -step * curW);
                    }, 300);
                }
            }
        }

        //->滑动结束延迟一段时间在开启自动轮播
        pauseTime = window.setTimeout(function () {
            autoTimer = window.setInterval(autoMove, interval);
            window.clearTimeout(pauseTime);
        }, interval);

        //->把设置的自定义属性置为空
        $(this).attr({
            strX: null,
            strY: null,
            strL: null,
            changeX: null,
            flag: null,
            dir: null
        });
    }
});
//->计算是否为滑动
function isSwipe(strX, endX, strY, endY) {
    return (Math.abs(endX - strX) > 30) || (Math.abs(endY - strY) > 30);
}
//->计算滑动的方向
function swipeDir(strX, endX, strY, endY) {
    return Math.abs(endX - strX) > Math.abs(endY - strY) ? (endX - strX > 0 ? "right" : "left") : (endY - strY > 0 ? "down" : "up");
}