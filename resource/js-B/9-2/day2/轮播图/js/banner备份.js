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
                //->this===oImg
                $(curImg).attr("src", $(this).attr("src")).css("display", "block");
            });
        });
    }, 1000);
});

//->WRAP以及其底下子元素的宽度都需要进行动态的设置
$(function () {
    var curW = document.documentElement.clientWidth;
    var $wrap = $(".wrap"),
        $wrapDivList = $wrap.children("div"),//->克隆前只有三张
        $wrapFir = $wrapDivList.eq(0),
        $wrapLast = $wrapDivList.eq($wrapDivList.length - 1);

    //->为了实现无缝衔接的轮播图滚动,我们需要在开头和结尾的位置多加一张图片:把第一张放在末尾,把最后一张放在开头的位置
    $wrapFir.clone(true).appendTo($wrap);
    $wrapLast.clone(true).prependTo($wrap);

    //->重新计算本区域元素的宽度
    $wrapDivList = $wrap.children("div");//->克隆后有五张图片
    $wrapDivList.css("width", curW);
    $wrap.css({
        width: $wrapDivList.length * curW
    });
    $wrap[0].style.webkitTransitionDuration = "0s";
    $wrap[0].style.webkitTransform = "translateX(-" + curW + "px)";
});

//->开始我们的核心操作:轮播
$(function () {
    $(document).on("touchmove", function (ev) {
        ev.preventDefault();
    });

    var curW = document.documentElement.clientWidth;
    var $banner = $(".banner"),
        $wrap = $(".wrap"),
        $wrapDivList = $wrap.children("div"),
        $tipList = $banner.find("li");

    var step = 1,
        count = $wrapDivList.length,
        interval = 2000,
        autoTimer = null;

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
        $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";

        //->已经运动到最后一张了,我们监听一个定时器,当经过300ms运动到最后一张的时候,我们的定时器也到达了指定的时间,此时我们让其立马回到索引为1的位置
        if (step === count - 1) {
            var delayTimer = window.setTimeout(function () {
                window.clearTimeout(delayTimer);
                step = 1;
                $wrap[0].style.webkitTransitionDuration = "0s";
                $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";
            }, 300);
        }

        //->焦点对齐
        changeBg();
    }

    //->实现左右切换轮播
    var moveFlag = false;
    $banner.on("touchstart", moveStart).on("touchmove", moving).on("touchend", moveEnd);

    function moveStart(ev) {
        if (moveFlag) {
            return;
        }
        //->触摸的时候结束自动轮播
        window.clearInterval(autoTimer);

        //->获取当前状态下的translateX的值
        var point = ev.touches[0],
            tran = $wrap[0].style.webkitTransform,
            reg = /-?\d+(?:\.\d+)?/;
        tran = reg.test(tran) ? reg.exec(tran)[0] : 0;

        //->把起始的值都记录下来
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            strL: tran
        });
    }

    function moving(ev) {
        if (moveFlag) {
            return;
        }
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
            $wrap[0].style.webkitTransitionDuration = "0s";
            $wrap[0].style.webkitTransform = "translateX(" + curL + "px)";
        }
        $(this).attr({
            changeX: changeX,
            flag: flag,
            dir: dir
        });
    }

    function moveEnd(ev) {
        if (moveFlag) {
            return;
        }
        moveFlag = true;
        var flag = $(this).attr("flag"),
            dir = $(this).attr("dir"),
            changeX = parseFloat($(this).attr("changeX"));

        if (flag == "true" && /(right|left)/i.test(dir)) {
            Math.abs(changeX) >= curW / 3 ? (dir === "left" ? step++ : step--) : null;
            $wrap[0].style.webkitTransitionDuration = "0.3s";
            $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";
            changeBg();

            //->边界判断
            var delayTimer = null;
            if (dir === "left") {//->右边界
                if (step === count - 1) {
                    delayTimer = window.setTimeout(function () {
                        window.clearTimeout(delayTimer);
                        step = 1;
                        publicEnd(true);
                    }, 300);
                } else {
                    publicEnd();
                }
            }
            if (dir === "right") {//->左边界
                if (step === 0) {
                    delayTimer = window.setTimeout(function () {
                        window.clearTimeout(delayTimer);
                        step = count - 2;
                        publicEnd(true);
                    }, 300);
                } else {
                    publicEnd();
                }
            }
        }

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

    function publicEnd(isTar) {
        if (isTar) {
            $wrap[0].style.webkitTransitionDuration = "0s";
            $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";
        }
        autoTimer = window.setInterval(autoMove, interval);
        moveFlag = false;
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