/**
 * Created by ajia on 16/6/2.
 */
window.onload=function(){
    (function(){
        var cityList=document.getElementById('cityList');
        var city=document.getElementById('city');
        function citySelect(ev){
            ev=ev||window.event;
            var tar=ev.target||ev.srcElement;
            city.innerHTML=tar.innerHTML;
            select();
        }
        function select(){
            var aA=cityList.getElementsByTagName('a');
            for(var i=0;i<aA.length;i++){
                var curA=aA[i].innerHTML;
                if(curA==city.innerHTML){
                    aA[i].className ='bg';
                }else{
                    aA[i].className=null;
                }
            }
        }
        select();
        cityList.addEventListener('click',citySelect);
    })();
    // 以上是快捷键左侧,城市的选择
    var oBanner=document.getElementById('banner1');
    var oSpan=oBanner.getElementsByTagName('span')[0];
    oSpan.onclick=function(){
        oBanner.style.display='none';
    };
   // 以上是banner1的点击隐藏
    (function(){
        var menus=document.getElementById("menus");
        var aLi=utils.children(menus);
        for(var i=0,ln=aLi.length;i<ln;i++){
            var curLi=aLi[i];
            aLi[i].index=i;
            curLi.onmouseover=function(){
                var _this=this;
                var h=utils.children(this)[0];
                var div=utils.next(h);
                var docScrollT=document.documentElement.scrollTop||document.body.scrollTop;
                var menusOffsetT=menus.offsetTop;
                if(menusOffsetT<=docScrollT){
                    div.style.top=(docScrollT-menusOffsetT-1)+"px";
                }
                utils.addClass(h,'list');
                div.style.display='block';
            };
            curLi.onmouseout=function(){
                var h=utils.children(this)[0];
                var div=utils.next(h);
                div.style.top="-1px";
                utils.removeClass(h,'list');
                div.style.display='none';
            }
        }
    })();
   // 以上是banner图左侧部分
    (function(){
        var banner=document.getElementById('banner');
        var inner=banner.getElementsByTagName('div')[0];
        var listA=inner.getElementsByTagName('a');
        var oLis=banner.getElementsByTagName('li');
        var btnL=utils.next(inner);
        var btnR=utils.next(btnL);
        var autoTimer=null;
        var interval=2000;
        var step=0;
        listA[0].style.zIndex=1;
        animate(listA[0],{opacity:1},600);
        clearInterval(autoTimer);
        autoTimer=setInterval(autoMove,interval);
        function autoMove(){
            if(step>=listA.length-1){
                step=-1;
            }
            step++;
            setBanner();
        }
        function setBanner(){
            for(var i=0,ln=listA.length;i<ln;i++){
                var curA=listA[i];
                if(step==i){
                    curA.style.zIndex=1;
                    animate(curA,{opacity:1},600,function(){
                        var siblings=utils.siblings(this);
                        for(var i=0,le=siblings.length;i<le;i++){
                            var curS=siblings[i];
                            utils.css(curS,"opacity",0);
                        }
                    });
                    continue;
                }
                curA.style.zIndex=0;
            }
            bannerTip();
        }
        function bannerTip(){
            for(var i=0,ln=oLis.length;i<ln;i++){
                i==step?oLis[i].className='over':oLis[i].className='';
            }
        }
        banner.onmouseover=function(){
            clearInterval(autoTimer);
            btnL.style.display='block';
            btnR.style.display='block';
        };
        banner .onmouseout=function(){
            autoTimer=setInterval(autoMove,interval);
            btnL.style.display='none';
            btnR.style.display='none';
        };
        handleChange();
        function handleChange(){
            for(var i=0,ln=oLis.length;i<ln;i++){
                var curLi=oLis[i];
                oLis[i].index=i;
                curLi.onmouseover=function(){
                    step=this.index;
                    setBanner();
                };
            }
        }
        btnR.onclick=autoMove;
        btnL.onclick=function(){
            if(step<=0){
                step=listA.length;
            }
            step--;
            setBanner();
        }
    })();
//    以上是轮播图
    (function(){
        var minB=document.getElementById('minB');
        var oUl=minB.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName("li");
        var btnL=utils.next(oUl);
        var btnR=utils.next(btnL);
        var step=null;
        var li=aLi[0].cloneNode(true);
        oUl.appendChild(li);
        oUl.style.width=aLi.length*1000+"px";
        minB.onmousemove=function(){
            btnL.style.display='block';
            btnR.style.display='block';
        };
        minB.onmouseout=function(){
            btnL.style.display='none';
            btnR.style.display='none';
        };
        btnR.onclick=function(){
            if(step>=aLi.length-1){
                oUl.style.left=0;
                step=0;
            }
            step++;
            animate(oUl,{'left':-step*1000},1000)

        };
        btnL.onclick=function(){
            if(step<=0){
                oUl.style.left=-(aLi.length-1)*1000+'px';
                step=aLi.length-1;
            }
            step--;
            animate(oUl,{left:-step*1000},1000)
        };
    })();
   // 以上是轮播图下边一栏
    (function(){
        var oDiv=document.getElementById('toolbar');
        var aLi=oDiv.getElementsByTagName('li');
        var b=aLi[1].getElementsByTagName('b')[0];
        var b1=aLi[0].getElementsByTagName('b')[0];
        var div=oDiv.getElementsByTagName('div')[0];
        for(var i=0,ln=aLi.length;i<ln;i++){
            var curLi=aLi[i];
            this.index=i;
            curLi.onmouseover=function(){
                var oI=this.getElementsByTagName('i')[0];
                var span=this.getElementsByTagName('span')[0];
                oI.className='color';
                span.className='color';
                if(this.parentNode.nodeName==='OL'){
                    animate(span,{'left':-57},300);
                }else{
                    animate(span,{'left':-47},300);
                }
            };
            curLi.onmouseout=function(){
                var oI=this.getElementsByTagName('i')[0];
                var span=this.getElementsByTagName('span')[0];
                oI.className='';
                span.className='';
                animate(span,{'left':0},300);
            };
            curLi.onclick=function(){
                var span=this.getElementsByTagName('span')[0];
                span.style.left=0;
                animate(oDiv,{'right':270},300)
            }
            div.onmouseout=function(){
                animate(oDiv,{'right':0},300)
            }
        }
    })();
    // 以上是右侧固定定位的盒子;
    var gessC=document.getElementById('gessC');
    var line=document.getElementById('line');
   gessC.onmouseenter=function(){
       var _this=line;
       utils.addClass(line,"move");
       var timer=window.setTimeout(function(){
           _this.style.webkitTranslateX="translateX(0)";
           utils.removeClass(line,'move')
       },800);
       };
//        以上是猜你喜欢部分
    (function(){
        var fore2=document.getElementById('fore2');
        var div=fore2.getElementsByTagName('div')[0];
        var aL=div.getElementsByTagName("a");
        var oUl=fore2.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var oBtnLeft=utils.children(fore2)[1];
        var oBtnRight=utils.children(fore2)[2];
        var autoTimer=null;
        var interval=1000;
        var step=0;
        div.innerHTML+='<a href=""><img src="img/floor-1.jpg" alt=""></a>';
        div.style.width=aL.length*aL[0].offsetWidth+'px';
        clearInterval(autoTimer);
        autoTimer=setInterval(autoMove,interval);
        function autoMove(){
            if(step>=aL.length-1){
                step=0;
                utils.css(div,'left',0)
            }
            step++;
            animate(div,{'left':-step*439},500);
            bannerTip();
        }
        function bannerTip(){
            var tmpStep=step>=aL.length-1?0:step;
            for(var i=0; i<aLi.length; i++){
                var curLi=aLi[i];
                i===tmpStep?curLi.className="over":curLi.className="";
            }
        }
        fore2.onmouseover=function(){
            clearInterval(autoTimer);
            utils.css(oBtnLeft,'display','block');
            utils.css(oBtnRight,'display','block');
        };
        fore2.onmouseout=function(){
            autoTimer=setInterval(autoMove,interval);
            utils.css(oBtnLeft,'display','none');
            utils.css(oBtnRight,'display','none');
        };
        handleChange();
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                var curLi=aLi[i];
                curLi.index=i;
                curLi.onmouseover=function(){
                    step=this.index;
                    animate(div,{'left':-step*439},500);
                    bannerTip();
                }
            }
        }
        oBtnRight.onclick=autoMove;
        oBtnLeft.onclick=function(){
            if(step<=0){
                step=aL.length-1;
                div.style.left=-step*439+"px";
            }
            step--;
            animate(div,{'left':-step*439},500);
            bannerTip();
        };
    })();
//    以上是楼层里的轮播图
    (function(){
        var selectM=document.getElementById("selectM"),
            aLi=selectM.getElementsByTagName("li"),
            side=document.getElementById("side"),
            aDiv=utils.nextAll(side);
        console.log(aDiv.length);
        for(var i=0,ln=aLi.length;i<ln;i++){
            var curLi=aLi[i];
            curLi.index=i;
            curLi.onmouseover=function(){
                for(var j=0,ln=aDiv.length;j<ln;j++){
                    aDiv[j].style.display="none";
                    aLi[j].className="";
                }
                this.className="selectF";
                aDiv[this.index].style.display="block";
            }
        }

    })()
//    以上是单楼层中的选项卡切换
    var ul=document.getElementById('tt'),
        aLi=ul.getElementsByTagName("li");
    for(var i=0;i<aLi.length;i++){
        var curLi=aLi[i];
        curLi.onmouseover=function(){
            var img=utils.firstChild(this);
            utils.addClass(img,"sprot");
        };
        curLi.onmouseout=function(){
            var img=utils.firstChild(this);
            utils.removeClass(img,"sprot");
        }
    }
};
