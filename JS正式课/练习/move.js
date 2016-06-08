(function(){
    var zhufengEffext={
        Linear:function Linera(t,b,c,d){
            return c*t/d+b;
        }
    };
    function move(curEle,target,duration,effect,callback){
        var tempEffect=zhufengEffext.Linear;
        if(typeof effect==="function"){
            callback=effect;
        }
        clearInterval(curEle.timer);
        var time=null,begin={},change={};
        duration=duration||2000;
        for(var attr in target){
            begin[attr]=getComputedStyle(curEle,null)[attr];
            change[attr]=target[attr]-begin[attr];
        }
        curEle.timer=setInterval(function(){
            if(time>=duration){
                for(var attr in target){
                    curEle.style[attr]=target[attr];
                }
                clearInterval(curEle.timer);
                callback&&callback.call(curEle);
                return;
            }
            time+=10;
            for(var attr in change){
                var curPos=tempEffect(time,begin[attr],change[attr],duration)
                curEle.style[attr]=curPos;
            }
        },10)
         
    }
   window.zhufengAnimate=move; 
})();