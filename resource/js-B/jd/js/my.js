
	function byclass(classn){//全局获取
		var tags=document.all ? document.all : document.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].className.indexOf(classn)!=-1) {
				arr.push(tags[i]);
			}
		}
		return arr;
	}
	function getclass(parentID,classn){//局部获取
		var parent=document.getElementById(parentID);
		var tags=parent.all?parent.all:parent.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].className.indexOf(classn)!=-1) {
				arr.push(tags[i]);
			}
		}
		return arr;
	}
    //阻止默认事件
    //obj.onclick=function(ev){
//        var event=ev||window.event;
//        if(event.preventDefault){
//            event.preventDefault();
//        }else{
//            event.returnValue=false;
//        }
    //
    //
    // }
    //return false; 也能阻止默认时间 但是要注意位置。
	function getstyle(obj,oStyle){//获取元素样式
		if (obj.currentStyle) {
			return obj.currentStyle[oStyle];
		} else{
			return getComputedStyle(obj,null)[oStyle];
		}
	}
	function nextnode(obj){//获取下一个兄弟节点
		if (obj.nextElementSibling) {
			return obj.nextElementSibling;
		} else{
			return obj.nextSibling;
		}
	}
	function prenode(obj){//获取上一个兄弟节点
		if (obj.previousElementSibling) {
			return obj.previousElementSibling;
		} else{
			return obj.previousSibling;
		}
	}
	function firstnode(obj){//获取第一个子节点
		if (obj.firstElementChild) {
			return obj.firstElementChild;//非IE678支持
		} else{
			return obj.firstChild;//IE678支持
		}
	}
	function lastnode(obj){//获取最后一个子节点
		if (obj.lastElementChild) {
			return obj.lastElementChild;//非IE678支持
		} else{
			return obj.lastChild;//IE678支持
		}
	}
    function addEvent(obj,type,fn){ //添加事件
        if(obj.addEventListener){
            obj.addEventListener(type,fn,false); //非IE添加事件监听

        }else{
            obj.attachEvent('on'+type,fn); //IE添加事件绑定
            stopEvent();
        }
    }
    //在onclick添加事件后若要阻止事件传播
    //obj.onclick=function(ev){
//            var event=ev||window.event;
//            alert('aa');
//            if(event.stopPropagation){
//                event.stopPropagation(); //非IE阻止事件传播
//            }else{
//                event.cancelBubble=true; //IE
//            }

    // }
    function removeEvent(obj,type,fn){ //移除事件
        if(obj.removeEventListener){
            obj.removeEventListener(type,fn,false); //非IE移除事件,移除事件，第三个参数必须是函数名

        }else{
            obj.detachEvent('on'+type,fn); //IE移除事件
        }
    }
    //mouseover委托事件
//    var event=ev||window.event;
//    // var from=event.fromElement||event.relatedTarget;
//    //在mouseover事件中from，表示鼠标来自哪个元素，也是事件委托类型，和target与srcElement相反
//    // alert(from);
//    var from=event.fromElement||event.relatedTarget;
//    while(from){
//        if (this==from) {
//            return false;
//        };
//        from=from.parentNode;
//    }
    //mouseout委托事件
//    var event=ev||window.event;
    //    var to=event.toElement||event.relatedTarget;
    //    //在mouseout事件中to，表示鼠标指向那个元素，也是事件委托类型，和target与srcElement相反
    //    // alert(to)
    //    while(to){
    //        if (this==to) {
    //            return false;
    //        };
    //        to=to.parentNode;
    //    }
    /*box.onmousewheel=function (ev){
     var event=ev||window.event;
     // box.innerHTML='鼠标滚动'+event.wheelDelta;
     if (event.wheelDelta>0) {
     alert('鼠标前滚');//非火狐 前滚120
     } else{
     alert('鼠标后滚')//非火狐 后滚-120
     };
     }*/
    /*box.addEventListener('DOMMouseScroll',function (ev){
     var event=ev||window.event;
     alert(event.detail);//火狐前滚：-3 ，后滚：3
     },false)//IE678不支持*/
    //获取到body的offsetTop和offsetLeft
    function offsetTL(obj){
        var t=0,l=0;
        while(obj){
            t=t+obj.offsetTop;
            l=l+obj.offsetLeft;
            obj=obj.offsetParent;
        }
        return {top:t,left:l};
    }

