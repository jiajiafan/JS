/**
 * Created by xiao lei on 2016/5/28.
 */
(function(){
    var oBox=document.getElementById('box');
    var oImgWrap=oBox.getElementsByTagName('div')[0];
    var aDiv=oImgWrap.getElementsByTagName('div');
    var aImg=oImgWrap.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var autoTimer=null;
    var interval=1000;
    var step=0;
    var data=null;
    var setTimer=null;
    //1.ajax获取和解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest();
        xml.open('get','json/data.txt?_='+Math.random(),false);
        xml.onreadystatechange= function () {
            if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }
    //2.绑定数据
    //注意两点：
    //1.oImgWrap要放5组数据，其中4组通过for循环；最后一个在for循环外单独拼接；最后一个等于第一个；
    //2.按钮拼接时，要注意点亮第一个；
    bind();
    function bind(){
        var str='';
        var str2='';
        for(var i=0; i<data.length; i++){
            str+='<div><img src="" realImg="'+data[i].imgSrc+'" alt=""/></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        str+='<div><img src="" realImg="'+data[0].imgSrc+'" alt=""/></div>'
        oImgWrap.innerHTML=str;
        oUl.innerHTML=str2;
    }
    oImgWrap.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
    //3.延迟加载数据：
    // 问题：一定要注意onload是异步加载；循环中的i值一定会出错；
    //解决方式：闭包or自定义属性
    setTimer=setTimeout(lazyImg,500);
    function lazyImg(){
        for(var i=0; i<aImg.length; i++){
            (function(index){
                var curImg=aImg[index];
                var oImg=new Image;
                oImg.src=curImg.getAttribute('realImg');
                oImg.onload=function(){
                    curImg.src=this.src;
                    oImg=null;
                }
            })(i);
        }
    }
    //4.图片自动轮播
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oImgWrap,'left',0);//当step到达最大值时，让他等于0；同时快速拉回图片到0的位置，此时一定不能用运动
        }
        step++;
        zhufengAnimate(oImgWrap,{'left':-step*1000},500);
        bannerTip();
    }
    //5.焦点自动轮播
    //问题：注意step和i值不匹配
    //解决方式：建立临时变量tempStep来解决step和i值不匹配的问题
    function bannerTip(){
        var tempStep=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            var curLi=aLi[i];
            i===tempStep?utils.addClass(curLi,'bg'):utils.removeClass(curLi,'bg');
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
    //7.点击焦点手动切换图片
    //问题：异步
    //解决：自定义属性
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            var curLi=aLi[i];
            curLi.index=i;
            curLi.onclick=function(){
                step=this.index;
                zhufengAnimate(oImgWrap,{'left':-step*1000},500);
                bannerTip();
            }
        }
    }
    //8.左右按钮切换图片
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aDiv.length-1;
            utils.css(oImgWrap,'left',-step*1000)
        }
        step--;
        zhufengAnimate(oImgWrap,{'left':-step*1000},500);
        bannerTip();
    };
})();












