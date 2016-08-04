//->在NODE中的JS:全局对象不是window而是global
//var count = 0;
//global.setTimeout(function () {
//    count++;
//    console.log(count);//->3) 0
//}, 20);
//global.setTimeout(function () {
//    count--;
//    console.log(count);//->2) -1
//}, 5);
//console.log(count);//->1) 0

var count = 0;
global.setTimeout(function () {
    count++;
    console.log(count);//->2)1
}, 6);
global.setTimeout(function () {
    count--;
    console.log(count);//->3)0
}, 5);

var i = 0;
while (i < 1000000000) {//->所需要的时间肯定超过6ms了
    i++;
}
console.log(count);//->1)0
