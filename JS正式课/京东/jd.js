/**
 * Created by ajia on 16/6/2.
 */
window.onload=function(){
    var cityList=document.getElementById('cityList');
    var city=document.getElementById('city');
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
    // 以上是快捷行左侧
 };

