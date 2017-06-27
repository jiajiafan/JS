/**
 * Created by xiao lei on 2016/5/29.
 */
$.extend({
    tab:myTab
})
function myTab(id){
    $(id+' input').click(function(){
        $(this).addClass('bg').siblings('input').removeClass('bg');
        $(id+' div').eq($(this).index()).addClass('show').siblings('div').removeClass('show');
    })
}