/**
 * Created by xiao lei on 2016/5/29.
 */
(function (){
    var oBox=document.getElementById('box');
    var oImgWrap=oBox.getElementsByTagName('div')[0];
    var aDiv=oImgWrap.getElementsByTagName('div');
    var aImg=oImgWrap.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var data=null;
    var step=0;
    var autoTimer=null;
    var interval=2000;
    //1.ajax获取和解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest();
        xml.open('get','json/data.txt',false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }
    //2.绑定数据
    bind();
    function bind(){
        var str='';
        var str2='';
        for(var i=0; i<data.length; i++){
            var curData=data[i];
            str+='<div><img src="" realImg="'+curData.imgSrc+'" alt=""/></div>';
            str2+=i==0?'<li class="bg"></li>':'<li></li>';
        }
        oImgWrap.innerHTML+=str;
        oUl.innerHTML+=str2;
    }
    //3.延迟加载
    lazyImg();
    function lazyImg(){
        for(var i=0; i<aImg.length; i++){
            (function(index){
                var curImg=aImg[index];
                var oImg=new Image;
                oImg.src=curImg.getAttribute('realImg');
                oImg.onload=function(){
                    curImg.src=this.src;
                    oImg=null;
                    //默认先让第一张图片显示
                    utils.css(aDiv[0],'zIndex',1);
                    zhufengAnimate(aDiv[0],{opacity:1},600)
                }
            })(i);
        }
    }
    //4.自动轮播
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aDiv.length; i++){
            var curDiv=aDiv[i];
            if(i===step){
                utils.css(curDiv,'zIndex',1);
                zhufengAnimate(curDiv,{'opacity':1},600,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        utils.css(siblings[i],'opacity',0);
                    }
                });
                continue;
            }
            utils.css(curDiv,'zIndex',0)
        }
        bannerTip();
    }
    //5.焦点轮播
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            var curLi=aLi[i];
            i===step?utils.addClass(curLi,'bg'):utils.removeClass(curLi,'bg');
        }
    }
    //6.鼠标移入停止，移出继续
    stopStart();
    function stopStart(){
        oBox.onmouseover=function(){
            clearInterval(autoTimer);
            utils.css(oBtnLeft,'display','block');
            utils.css(oBtnRight,'display','block');
        };
        oBox.onmouseout=function(){
            autoTimer=setInterval(autoMove,interval);
            utils.css(oBtnLeft,'display','none');
            utils.css(oBtnRight,'display','none');
        };
    }
    //7.点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            var curLi=aLi[i];
            curLi.index=i;
            curLi.onclick=function(){
                step=this.index;
                setBanner();
            }
        }
    }
    //8.左右按钮切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aDiv.length;
        }
        step--;
        setBanner();
    }
})();








