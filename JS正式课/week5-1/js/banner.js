~function ($) {
    function zhufengBanner(options) {
        options = options || {};
        //->初始化配置的参数值
        var _default = {
            url: "json/data.txt",
            autoInterval: 2000
        };
        jQuery.each(options, function (key, value) {
            _default[key] = value;
        });

        var $banner = $(this),
            $inner = $banner.children(".inner"),
            $tip = $banner.children(".tip"),
            $btnLeft = $banner.children(".btnLeft"),
            $btnRight = $banner.children(".btnRight");

        //->Ajax读取需要绑定的数据
        var jsonData = null;
        jQuery.ajax({
            url: _default.url + "?_=" + Math.random(),
            type: "get",
            async: false,
            dataType: "json",
            success: function (data) {
                jsonData = data;
            }
        });

        //->数据绑定
        ~function () {
            var str = '', str2 = '';
            jQuery.each(jsonData, function (index, curData) {
                if (index === 0) {
                    str += '<div style="z-index:1;">';
                    str += '<img src="" trueImg="' + curData["img"] + '"/>';
                    str += '</div>';
                    str2 += '<li class="bg"></li>';
                    return;
                }
                str += '<div>';
                str += '<img src="" trueImg="' + curData["img"] + '"/>';
                str += '</div>';
                str2 += '<li></li>';
            });
            $inner.html(str);
            $tip.html(str2);
        }();

        //->延迟加载
        var $imgList = $inner.find("img"),
            $divList = $inner.children("div"),
            $tipList = $tip.children("li");

        window.setTimeout(lazyImg, 500);
        function lazyImg() {
            $imgList.each(function (index, curImg) {
                //this->curImg
                var oImg = new Image;
                oImg.src = jQuery(curImg).attr("trueImg");
                oImg.onload = function () {
                    //this->oImg
                    //->让所有的图片都显示,但是只让第一张图片透明度变为1
                    jQuery(curImg).attr("src", this.src).css("display", "block");
                    if (index === 0) {
                        jQuery(curImg).stop().animate({opacity: 1}, 300);
                    }
                    oImg = null;
                };
            });
        }

        var step = 0, autoTimer = null;

        //->实现焦点对齐
        function changeTip() {
            //->$tipList.eq(step).addClass("bg").siblings().removeClass("bg");
            $tipList.each(function (index, curLi) {
                index === step ? jQuery(this).addClass("bg") : jQuery(this).removeClass("bg");
            });
        }

        //->实现自动轮播
        autoTimer = window.setInterval(autoMove, _default.autoInterval);
        function autoMove() {
            step++;
            if (step >= jsonData.length) {
                step = 0;
            }
            setBanner();
        }

        function setBanner() {
            //->让当前STEP对应索引的DIV/IMG的Z-INDEX变为1,同时OPACITY变为1
            $divList.eq(step).css("zIndex", 1).siblings().css("zIndex", 0);
            $imgList.eq(step).stop().animate({opacity: 1}, 300, function () {
                //this->当前正在运行动画的这张图片
                jQuery(this).parent().siblings().children("img").css("opacity", 0);
            });
            changeTip();
        }

        //->鼠标进入/离开BANNER这个区域,实现自动轮播的停止/重新开启
        $banner.on("mouseover", function () {
            window.clearInterval(autoTimer);
            $btnLeft.css("display", "block");
            $btnRight.css("display", "block");
        }).on("mouseout", function () {
            autoTimer = window.setInterval(autoMove, _default.autoInterval);
            $btnLeft.css("display", "none");
            $btnRight.css("display", "none");
        });

        //->点击焦点实现切换
        $tipList.on("click", function () {
            //this->当前点击的是哪一个LI,this就是谁
            step = jQuery(this).index();
            setBanner();
        });

        //->实现左右切换
        $btnLeft.on("click", function () {
            step--;
            if (step < 0) {
                step = jsonData.length - 1;
            }
            setBanner();
        });
        $btnRight.on("click", autoMove);
    }

    //->基于jQuery扩展插件
    $.fn.extend({
        zhufengBanner: zhufengBanner
    });
}(jQuery);