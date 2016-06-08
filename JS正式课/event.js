/**
 * Created by ajia on 16/6/5.
 */
(function(){
    function bind(curEle,type,fn){
        if(curEle.addEventListener){
            curEle.addEventListener(type,fn,false);
            return;
        }
        curEle.attachEvent("on"+type,fn);
    }
    function unbind(curEle,type,fn){
        if(curEle.removeEventListener){
            curEle.removeEventListener(type,fn,false);
            return;
        }
        curEle.detachEvent("on"+type,fn);
    }
    function on(curEle,type,fn){
        !curEle['myEvent'+type]?curEle['myEvent'+type]=[]:null;
        var ary=curEle['myEvent'+type];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===fn){
                return;
            }
        }
            ary.push(fn)
    }
    function off(curEle,type,fn){
        var ary=curEle['myEvent'+type];
        if(ary){
            for(var i=0;i<ary.length;i++){
                var curFn=ary[i];
                if(curFn===fn){
                    ary.splice(i,1);
                    return;
                }
            }
        }
        bind(curEle,type,run)
    }
    function run(ev){
        ev=ev||window.event;
        if()
        var ary=this['myEvent'+ev.type];
        if(ary){
            for(var i=0;i<ary.length;i++){
                var curFn=ary[i];
                if(typeof curFn==='function'){
                    curFn.call(this,ev);
                }
            }
        }
    }
})();