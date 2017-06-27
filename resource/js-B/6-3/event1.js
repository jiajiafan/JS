function on(ele,type,fn){
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];
		ele.attachEvent("on"+type,function(){run.call(ele)});	
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
}

function run(){
	var e=window.event;
	var type=e.type;
	if(!e.target){
		e.target=e.srcElement;
		e.stopPropagation=function(){e.cancelBubble=true;}	
		e.preventDefault=function(){e.returnValue=false;}
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		
	}
	var a=this["aEvent"+type];
	if(a)//此处花括号可以省略
		for(var i=0;i<a.length;i++)//此处花括号可以省略
			if(typeof a[i]=="function"){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;
			}
	}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				//i--;
				return;
			}
		}
	}
}
function processThis(fn,obj){
	//作用：让fn执行的时候，让fn的功能不变，但this被强制指向指定的参数obj。（或者说返回的这个匿名方法的功能和fn一样，但fn的this是强制指向obj的）
				return function(e){fn.call(obj,e);}
		}