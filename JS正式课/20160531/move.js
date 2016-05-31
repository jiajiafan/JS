/**
 * Created by lilonglong on 5/31/16.
 */
(function(){
    zhufengEffect={
        Linear:function Linear(t,b,c,d){
            return c/d*t+b;
        }
    };
    function move(curEle,target,duration,effect,callback){
        var tempEffect=zhufengEffect.Linear;
        if(typeof effect=='function'){
            callback=effect;
        }
        var time=0;
        var begin={};
        var change={};
        duration=duration||2000;
        //clearTimeout(curEle.timer)
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr)
            change[attr]=target[attr]-begin[attr];
        }
        curEle.timer=setInterval(function(){
            if(time>=duration){
                for(var attr in target){
                    utils.setCss(curEle,attr,target[attr])
                }
                clearInterval(curEle.timer);
                callback&&callback();
                return;
            }
            time++;
            for(var attr in change){
                var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration)
               utils.setCss(curEle,curPos)
            }
        },10)
    }
    window.Animate=move;
})()