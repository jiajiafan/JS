/**
 * Created by xiao lei on 2016/5/15.
 */
var utils=(function(){
    var flag='getComputedStyle' in window;
    return {
        //1.listToArray:类数组转数组
        listToArray:function listToArray(arg){
            if(flag){
                return Array.prototype.slice.call(arg);
            }else{
                var ary=[];
                for(var i=0; i<arg.length; i++){
                    ary.push(arg[i]);
                }
                return ary;
            }
        },
        //2.jsonParse:JSON格式的字符串转JSON格式数据
        jsonParse:function jsonParse(str){
            return flag?JSON.parse(str):eval('('+str+')');
        },
        //3.offset:当前元素距离body的偏移量
        offset:function offset(curEle){
            var l=0;
            var t=0;
            var par=curEle.offsetParent;
            l+=curEle.offsetLeft;
            t+=curEle.offsetTop;
            while(par){
                //IE8 offsetLeft/top已经包含了边框，但是其他浏览器不包含边框；
                if(navigator.userAgent.indexOf('MSIE 8.0')===-1){
                    l+=par.clientLeft;
                    t+=par.clientTop;
                }
                l+=par.offsetLeft;
                t+=par.offsetTop;
                par=par.offsetParent;

            }
            return {left:l,top:t}
        },
        //4.win:获取和设置浏览器盒子模型；
        win:function(attr,value){
            if(typeof value==='undefined'){
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
        //5.getByClass:在一定范围内通过className获取元素
        getByClass:function  getByClass(curEle,strClass){
            if(flag){//高级
                return this.listToArray(curEle.getElementsByClassName(strClass));
            }
            var ary=[];
            var aryClass=strClass.replace(/(^\s+)|(\s+$)/g,'').split(/\s+/g);
            var nodeList=curEle.getElementsByTagName('*');//拿到当前元素下所有元素
            for(var i=0; i<nodeList.length; i++){//循环：目的是为了匹配每个元素的className是否符合要求，匹配要求：是这个元素上的className符合aryclass中的每一个className字符串
                var curNode=nodeList[i];
                var bOk=true;//假设法：假设都符合
                for(var k=0; k<aryClass.length; k++){
                    var curClass=aryClass[k];
                    //var reg=new RegExp('(\\b)'+curClass+'(\\b)');
                    var reg=new RegExp('(^| +)'+curClass+'( +|$)');
                    if(!reg.test(curNode.className)){
                        bOk=false;
                    }
                }
                if(bOk){
                    ary.push(curNode)
                }
            }
            return ary;
        },
        //6.hasClass:判断当前元素上是否有这个strClass（class名）
        hasClass:function hasClass(curEle,strClass){
            var reg=new RegExp('(\\b)'+strClass+'(\\b)');
            return reg.test(curEle.className)
        },
        //7.addClass:添加一堆class名
        addClass:function addClass(curEle,strClass){
            var aryClass=strClass.replace(/(^\s+)|(\s+$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var curClass=aryClass[i];
                if(!this.hasClass(curEle,curClass)){
                    curEle.className+=' '+curClass;
                }
            }

        },
        //8.removeClass:移除掉当前元素上的class名
        removeClass:function removeClass(curEle,strClass){
            var aryClass=strClass.replace(/(^\s+)|(\s+$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var curClass=aryClass[i];
                if(this.hasClass(curEle,curClass)){
                    var reg=new RegExp('(^| +)'+curClass+'( +|$)')
                    curEle.className=curEle.className.replace(reg,' ')
                }
            }

        },
        //9.getCss:获取非行间样式
        getCss:function getCss(curEle,attr){
            var val=null;
            var reg=null;
            if(flag){//高级浏览器
                val=getComputedStyle(curEle,null)[attr];
            }else{//低级浏览器
                if(attr=='opacity'){// alpha(opacity=10)
                    val=curEle.currentStyle['filter'];
                    reg=/^alpha\(opacity[=:](\d+(?:\.\d+))?\)$/i;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }

            }
            reg=/^([+-]?\d+(\.\d+)?)(px|pt|em|rem)?$/i ;//-200px +200px 22.33px px pt em rem
            // reg=/^((\+|-)?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
            return reg.test(val)?parseFloat(val):val;
        },
        //10.setCss:设置行间样式
        setCss:function setCss(curEle,attr,value){
            //float
            if(attr=='float'){
                curEle.style.cssFloat=value;//火狐
                curEle.style.styleFloat=value;//ie
                return;
            }
            //透明度的处理
            if(attr==='opacity'){
                curEle.style.opacity=value;
                curEle.style.filter='alpha(opacity='+value*100+')';
                return;
            }
            //加单位的处理；
            var reg=/(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/
            if(reg.test(attr)){
                value+='px';
            }
            curEle.style[attr]=value;
        },
        //11.setGroupCss:设置一组样式
        setGroupCss:function setGroupCss(curEle,options){
            if(options.toString()!=='[object Object]'){
                return;
            }
            for(var attr in options){
                this.setCss(curEle,attr,options[attr])
            }
        },
        //12.css:获取和设置样式
        css:function css(curEle){
            var argTwo=arguments[1];
            if(typeof argTwo ==='string'){
                if(typeof arguments[2]!=='undefined'){// 单个设置
                    this.setCss(curEle,argTwo,arguments[2]);
                    return;
                }else{//获取
                    return this.getCss(curEle,argTwo)
                }
            }
            argTwo=argTwo||0;
            if(argTwo.toString()==='[object Object]'){//设置一组样式
                this.setGroupCss(curEle,argTwo)
            }
        }
    }
})();









