//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(720);

//->读取轮播图区域的数据,然后实现数据的绑定
var mySwiper = null;
var xhr = new XMLHttpRequest;
xhr.open("get", "/bannerInfo");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var data = JSON.parse(xhr.responseText);

        //->开始绑定数据
        var str = '';
        data.forEach(function (curData, index) {
            str += '<div class="swiper-slide">';
            str += '<img data-src="' + curData["url"] + '" class="swiper-lazy"/>';

            //->显示的是LOADING层的样式
            str += '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
            str += '</div>';
        });
        document.getElementById("bannerWrapper").innerHTML = str;

        //->开启滑动操作
        initSwiper();
    }
};
xhr.send(null);

//->初始化swiper
function initSwiper() {
    mySwiper = new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        loop: true,

        /*--实现自动切换以及滑动完成后重新开启自动的切换--*/
        autoplay: 3000,
        autoplayDisableOnInteraction: false,

        /*--实现延迟加载--*/
        lazyLoading: true,
        lazyLoadingInPrevNext: true
    });
}