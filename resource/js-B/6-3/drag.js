function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		
		this.MOVE=move.bind(this);
		this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);//我们设计的拖拽模块里的this的指向和事件绑定原则里的this指向冲突了，则必须把this“抢回来”
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
	selfRun.call(this,"selfdragstart",e);
}

function move(e){
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";	
	selfRun.call(this,"selfdragging",e);
	//on(ele,"selfdragging",getSpeed);//通知，发布
	//执行过程是on执行的时候，把getSpeed保存在ele["aSelf"+"selfdragging"]这个数组里了
	//"selfdragging"这个事件触发，就是move方法执行了
	//当move方法执行，由selfRun来通知--->
		//selfRun执行的时候，先把ele["aSelf"+"selfdragging"]找出来，这个数组和on里的数组是对应的
		//这个数组里保存着getSpeed这个方法，执行这个方法，执行这个方法的时候，把selfRun的第二个参数e（系统的事件对象）
	
}


function up(e){
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up);	
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);	
	}
	
	selfRun.call(this,"selfdragend",e);
}

//1.主行为已经确定；2.确定事件类型：down--"selfdragstart",move--"selfdragging",up---"selfdragend";

