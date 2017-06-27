autoTimer = window.setInterval(autoMove, interval);
function autoMove() {
    step++;
    if (step > count - 1) {
        $wrap[0].style.webkitTransitionDuration = "0s";
        $wrap[0].style.webkitTransform = "translateX(" + (-curW) + "px)";
        step = 2;
        window.setTimeout(function () {
            $wrap[0].style.webkitTransitionDuration = "0.3s";
            $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";
        }, 100);
        return;
    }
    $wrap[0].style.webkitTransitionDuration = "0.3s";
    $wrap[0].style.webkitTransform = "translateX(" + (-step * curW) + "px)";
}