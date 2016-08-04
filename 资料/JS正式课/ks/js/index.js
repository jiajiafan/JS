var boxList = document.getElementById("boxList"),
    pageList = document.getElementById("pageList"),
    pageLi = pageList.getElementsByTagName("li"),
    boxBtn = document.getElementById("boxBtn"),
    search = document.getElementById("search"),
    total = 0,
    n = 1;
bindData();
function bindData(){
    "use strict";
    function callback(jsonData){
        if(!jsonData){
            return;
        }
        total=jsonData['total'];
        var data=jsonData['data'],
            str='';
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+='<li>';
            str+='<span>'+curData['num']+'</span>';
            str+='<span>'+curData['name']+'</span>';
            str+='<span>'+curData['sex']+'</span>';
            str+='<span>'+curData['score']+'</span>';
            str+='</li>';
        }
        boxList.innerHTML=str;
        str='';
        for(i=1;i<=total;i++){
            str+='<li>'+i+'</li>';
        }
        pageList.innerHTML=str;
        for(i=0;i<pageLi.length;i++){
            pageLi[i].className=(i+1)==n?'bg':null;
        }
        search.value=n;
    }
    ajax({
        url:'/getData?n='+n+'&_='+Math.random(),
        success:callback
    });
}
boxBtn.onclick=function(ev){
    "use strict";
    ev=ev||window.event;
    var tar=ev.target||ev.srcElement,
        tarTag=tar.tagName.toUpperCase();
    if(tarTag==='APAN'){
        if(tar.innerHTML==='FIRST'){
            if(n==1){
                return;
            }
            n=1;
        }
    }
}
