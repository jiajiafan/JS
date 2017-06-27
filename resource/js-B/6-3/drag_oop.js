	
function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){
	if(!this["aEmitter"+type]){
		this["aEmitter"+type]=[];
	}
	var a=this["aEmitter"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return this;	
	}
	a.push(fn);
	return this;
}
EventEmitter.prototype.run=function(e,systemEvent){//第一个参数e是指自定义事件的对象，它最少包括一个e.type属性，是否需要更多属性，自行扩展既可。第二个参数systemEvent是浏览器的事件对象（指系统事件对象）
	var a=this["aEmitter"+e.type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,systemEvent,e);	
			}else{
				a.splice(i,1);	
				i--;
			}
		}
	}
	
}
EventEmitter.prototype.off=function(type,fn){
	var a=this["aEmitter"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return this;	
			}
		}
			
	}
	return this;
}
	//现在Drag可以实现自定义事件了，但是Drag还是需要系统的事件，则需要在EventEmitter类中，可以给系统事件留一个接口：让run方法的参数也可以传递系统的事件对象
	function Drag(ele){//类名、构造函数
	//构造函数是初始化的作用
		this.x=null;
		this.y=null;
		this.mx=null;
		this.my=null;
		
		this.ele=ele;
		this.DOWN=processThis(this.down,this);
		
		on(ele,"mousedown",this.DOWN);//这样处理，当事件触发的时候，执行的是this.DOWN,this.DOWN里的this是谁？this.down里的this为什么
		this.MOVE=processThis(this.move,this);
		this.UP=processThis(this.up,this);
	}
	Drag.prototype=new EventEmitter;//
	//down规定的事件标识符是：“dragstart”
	//move规定的事件标识符是："dragging"
	//up规定的事件标识符是："dragend"
	
	Drag.prototype.down=function(e){
		this.x=this.ele.offsetLeft;
		this.y=this.ele.offsetTop;
		this.mx=e.pageX;
		this.my=e.pageY;
		if(this.ele.setCapture){
			this.ele.setCapture();
			on(this.ele,"mousemove",this.MOVE);
			on(this.ele,"mouseup",this.UP);
		}else{
			on(document,"mousemove",this.MOVE);
			on(document,"mouseup",this.UP);
		}
		e.preventDefault();
		this.run({type:"dragstart"},e);
	};
	Drag.prototype.move=function(e){
		this.ele.style.left=this.x+e.pageX-this.mx+"px";
		this.ele.style.top=this.y+e.pageY-this.my+"px";
		this.run({type:"dragging"},e);
	};
	Drag.prototype.up=function(e){
		if(this.ele.releaseCapture){
			this.ele.releaseCapture();
			off(this.ele,"mousemove",this.MOVE);
			off(this.ele,"mouseup",this.UP);	
		}else{
			off(document,"mousemove",this.MOVE);
			off(document,"mouseup",this.UP);
		}
		this.run({type:"dragend"},e);
	};
	
	//-----------把产品升级到1.1,增加两个功能：限定拖拽和拖拽加边框
	
	Drag.prototype.range=function(oRange){
		this.range=oRange;
		this.on("dragging",this.addRange);
		
	}
	
	
	Drag.prototype.addRange=function(e){
		if(this.range){
			//oRange的格式如：{l:0,r:500,t:0,b:300}
			var currentX=this.x+e.pageX-this.mx;
			var currentY=this.y+e.pageY-this.my;
			if(currentX>=this.range.r){
				this.ele.style.left=this.range.r+"px";	
			}else if(currentX<=this.range.l){
				this.ele.style.left=this.range.l+"px";
			}else{
				this.ele.style.left=currentX+"px";	
			}
			
			if(currentY>=this.range.b){
				this.ele.style.top=this.range.b+"px";	
			}else if(currentY<=this.range.t){
				this.ele.style.top=this.range.t+"px";
			}else{
				this.ele.style.top=current+"px";	
			}
		}
	}
	
	Drag.prototype.border=function(){
		this.on("dragstart",this.addBorder);
		this.on("dragend",this.removeBorder);
	}
	
	Drag.prototype.addBorder=function(){
		this.ele.style.border="2px dashed green";	
	}
	Drag.prototype.removeBorder=function(){
		this.ele.style.border="none";	
	}
	
	
	
	
	//产品的问题：如果把Drag当成一个产品给别人使用，那首先要有一个帮助手册（API）
	/*
	
				拖拽产品1.0使用手册
		1、类名叫Drag,实现拖拽的代码是var obj=new Drag(ele);ele是被拖拽的元素
		2、Drag类的主要方法有
			Drag.prototype.down;
			Drag.prototype.move
			Drag.prototype.up;
			
			this.ele
			obj.ele这个属性是保存在实例上的被拖拽的元素，当前实例的ele属性可以得到被拖拽的元素
		3、此产品还留有足够的扩展接口，分别是三个事件
			如果在拖拽开始的阶段扩展功能，则：
				obj.on("dragstart",fn);
			在拖拽时行的阶段扩展功能，则
				obj.on("dragging",fn);
			在拖拽结束的阶段扩展功能，则
				obj.on("dragend",fn);
		
		升级到1.1
			4.限定范围的拖拽
				Drag.prototype.range=function(oRange){
					oRange的格式如：{l:0,r:500,t:0,b:300}
					如果只做水平方向的拖拽：{t:300,b:300}
				}
				拖拽的时候加边框
			
			
		
	*/