function on(ele,type,fn){
	//加一段代码，使on方法可以处理自定义事件
	if(/^self/.test(type)){
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		//return;
	}else if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
	}else{
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
	
}


function run(){
	
	var e=window.event;
	var type=e.type;
	if(!e.target){//如果事件对象上不支持类型似于target的这些属性，我们想个办法，让假装支持
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		e.stopPropagation=function (){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;}
		
	}
	var a=this["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			var fn=a[i];
			if(typeof fn=="function"){
					fn.call(this,e);//让IE保持像chrome一样，事件对象是以参数的方式传进来的
			}else{
				a.splice(i,1);
				i--;
			}
		}
	}
}
function selfRun(selfType,e){//专门用来处理自定义事件的通知方法。两个参数分别是：selfType自已发布的事件（自定义事件），e是指在执行selfRun的时候，把系统的事件对象也传进去，方便绑定在自定义事件上的方法可以使用系统事件
		//此方法的本质就是对selfType对应的那个数组里，遍历执行里面保存的方法
	var a=this["aSelf"+selfType];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
	
	
}
function off(ele,type,fn){
	if(/^self/.test(type)){
		var a=ele["aSelf"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					return;	
				}
			}
		}
		return;
	}
	if(ele.removeEventListener){//标准浏览器就使用以下的方法
		ele.removeEventListener(type,fn,false);
	}else{
		var a=ele["aEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					//a.splice(i,1);
					a[i]=null;
					return;	
				}
			}
		}
	}
}

function processThis(fn,obj){
				return function(e){fn.call(obj,e)}
			}