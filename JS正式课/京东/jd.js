/**
 * Created by ajia on 16/6/2.
 */
window.onload=function(){
    var cityList=document.getElementById('cityList');
    var city=document.getElementById('city');
    var oBanner=document.getElementById('banner1');
    var oSpan=oBanner.getElementsByTagName('span')[0];
    function citySelect(ev){
        ev=ev||window.event;
        var tar=ev.target||ev.srcElement;
        city.innerHTML=tar.innerHTML;
        select();
    }
    function select(){
        var aA=cityList.getElementsByTagName('a');
        for(var i=0;i<aA.length;i++){
            var curA=aA[i].innerHTML;
            if(curA==city.innerHTML){
                aA[i].className ='bg';
            }else{
                aA[i].className=null;
            }
        }

    }
     select();
    cityList.addEventListener('click',citySelect);
    // 以上是快捷键左侧,城市的选择
    oSpan.onclick=function(){
        oBanner.style.display='none';
    };
   // 以上是banner1的点击隐藏
    var menus=document.getElementById("menus");
    var aLi=utils.children(menus);
    for(var i=0,ln=aLi.length;i<ln;i++){
        var curLi=aLi[i];
        aLi[i].index=i;
        curLi.onmouseover=function(){
            var h=utils.children(this)[0];
            var div=utils.next(h);
            utils.addClass(h,'list');
            div.style.display='block';
        };
        curLi.onmouseout=function(){
            var h=utils.children(this)[0];
            var div=utils.next(h);
            utils.removeClass(h,'list');
            div.style.display='none';
        }
    }
//    以上是banner图左侧部分
    





};

