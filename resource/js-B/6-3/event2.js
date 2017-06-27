function on(ele,type,fn){
	//凡是事件类型以"self"开头的，都按自定义处理
	
	if(/^self/.test(type)){
		//创建一个专门保存自定义事件的程序池
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){if(a[i]==fn)return;	}
		a.push(fn);
		return;
	}
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
	

//selfRun是负责通知的方法
/*
on{
	ele["aSelf"+type];//保存的的名字，比如type里保存的是"selfdragstart"
	this["aSelf"+selfType];//读的时候叫这个名,selfType里保存的也是"selfdragsatrt",
	//那以上两行是不是一个数组呢？
}
*/
function selfRun(selfType,event){//selfType是自定义事件类型,第二个参数e是指系统的事件对象（原生的事件对象）

	var a=this["aSelf"+selfType];//找到这个数组
	if(a){
			for(var i=0;i<a.length;i++){//然后遍历执行事先由on方法保存数组里的那些方法
				if(typeof a[i]=="function"){
					//a[i].call(this,oSelfEvent);	
					a[i].call(this,event);
				}
			}
	}
	
}

function selfRun2(oSelfEvent){
	//oSelfEvent是自定义的事件对象
	//	selfType,是自定义的事件类型，事件类型只是整个事件对象中的一个属性
	//oSelfEvent={type:"selfdragend",message:"up方法执行"};//oSelfEvent是类似于这样的一个对象
	
	var a=this["aSelf"+oSelfEvent.type];//找到对应的数组

	if(a){
			for(var i=0;i<a.length;i++){//然后遍历执行事先由on方法保存数组里的那些方法
				if(typeof a[i]=="function"){
					//a[i].call(this,oSelfEvent);	
					a[i].call(this);
				}
			}
	}
	
}
/*
function fn1(e){
	alert(e.pageX);	
}
ele.onclick=fn1;
ele.addEventListener("click",fn1,false);

run{
	event;//在通知里面包装好，然后调用执行fn1，再把这个已经包装好的event当实参传给fn1.(其实event对象应该是调用run方法的那个主行为包装的)
	fn1(event);
	
}
*/
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