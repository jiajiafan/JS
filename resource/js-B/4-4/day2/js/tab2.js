/**
 * Created by xiao lei on 2016/5/29.
 */
$.fn.extend({
    tab:myTab,
});
function myTab(){
    var oDiv=$(this);//this,是调用这个函数，this就是谁；this就是实例；
    var aInput=oDiv.children('input');
    var aDiv=oDiv.children('div');
    aInput.click(function(){
        $(this).addClass('bg').siblings('input').removeClass('bg');
        aDiv.eq($(this).index()).addClass('show').siblings('div').removeClass('show');
    })
}






