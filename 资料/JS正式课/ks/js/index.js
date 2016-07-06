
var boxList = document.getElementById("boxList"),
    pageList = document.getElementById("pageList"),
    pageLi = pageList.getElementsByTagName("li"),
    boxBtn = document.getElementById("boxBtn"),
    search = document.getElementById("search"),
    total = 0,
    n = 1;
bindData();
function bindData() {
    function callback(jsonData) {
        if (!jsonData) {
            return;
        }
        total = jsonData["total"];
        var data = jsonData["data"],
            str = '';

        //->绑定列表区域的数据
        for (var i = 0, len = data.length; i < len; i++) {
            var curData = data[i];
            str += '<li>';
            str += '<span>' + curData["num"] + '</span>';
            str += '<span>' + curData["name"] + '</span>';
            str += '<span>' + (curData["sex"] == 1 ? "女" : "男") + '</span>';
            str += '<span>' + curData["score"] + '</span>';
            str += '</li>';
        }
        boxList.innerHTML = str;
        str = '';
        for (i = 1; i <= total; i++) {
            str += '<li>' + i + '</li>';
        }
        pageList.innerHTML = str;

        for (i = 0, len = pageLi.length; i < len; i++) {
            pageLi[i].className = (i + 1) == n ? "bg" : null;
        }
        search.value = n;
    }

    ajax({
        url: "/getData?n=" + n + "&_=" + Math.random(),
        success: callback
    });
}
boxBtn.onclick = function (ev) {
    ev = ev || window.event;
    var tar = ev.target || ev.srcElement,
        tarTag = tar.tagName.toUpperCase();
    if (tarTag === "SPAN") {
        if (tar.innerHTML === "FIRST") {
            if (n == 1) {
                return;
            }
            n = 1;
        }
        if (tar.innerHTML === "LAST") {
            if (n == total) {
                return;
            }
            n = total;
        }

        if (tar.innerHTML === "PREV") {
            if (n == 1) {
                return;
            }
            n--;
        }
        if (tar.innerHTML === "NEXT") {
            if (n == total) {
                return;
            }
            n++;
        }
    }
    if (tarTag === "LI") {
        if (n == tar.innerHTML) {
            return;
        }
        n = parseFloat(tar.innerHTML);
    }

    bindData();
};
search.onkeyup = function (ev) {
    ev = ev || window.event;
    if (ev.keyCode === 13) {
        n=this.value;
        bindData();
    }
};