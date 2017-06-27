/**
 * Created by xiao lei on 2016/5/29.
 */
$(function(){
    var oBox=$('#box');
    var oImgWrap=oBox.children('div');
    var aDiv=null;
    var aImg=null;
    var oUl=oBox.children('ul');
    var aLi=null;
    var oBtnLeft=oBox.children('a').eq(0);
    var oBtnRight=oBox.children('a').eq(1);
    var jsonData=null;
    var step=0;
    var autoTimer=null;
    var interval=2000;
    //1.获取和解析数据
    $.ajax({
        type:'get',
        url:'json/data.txt?_='+Math.random(),
        dataType:'json',
        async:false,
        success:function(data){
            jsonData=data;
        }
    });
    //2.绑定数据
    bind();
    function bind(){
        var str='';
        var str2='';
        $.each(jsonData,function(index,item){
            str+='<div><img src="" realImg="'+item.imgSrc+'" alt=""/></div>';
            str2+=index==0?'<li class="bg"></li>':'<li></li>';
        })
        oImgWrap.html(str);
        oUl.html(str2);
        //重新获取数据
        aDiv=oImgWrap.children('div');
        aImg=oImgWrap.find('img');
        aLi=oUl.children('li');
    }
    //3.延迟加载
    lazyImg();
    function lazyImg(){
        aImg.each(function(index,item){
            var oImg=new Image;
            oImg.src=$(item).attr('realImg');
            oImg.onload=function(){
                $(item).attr('src',this.src);
                oImg=null;
                var firDiv=aDiv.eq(0);
                firDiv.css('zIndex',1);
                firDiv.stop().animate({opacity:1},600)
            }
        })
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
        aDiv.each(function(index,item){
            if(index==step){
                $(item).css('zIndex',1);
                $(item).stop().animate({opacity:1},600,function(){
                    $(this).siblings('div').css('opacity',0);
                })
            }else{
                $(item).css('zIndex',0);
            }

        });
        bannerTip();
    }
    //5.焦点自动切换
    function bannerTip(){
        aLi.each(function(index,item){
            var curLi=$(item);
            index==step?curLi.addClass('bg'):curLi.removeClass('bg');
        })
    }
    //6.鼠标移入停止，移出继续
    oBox.mouseover(function(){
        clearInterval(autoTimer);
        oBtnLeft.css('display','block');
        oBtnRight.css('display','block');
    });
    oBox.mouseout(function(){
        autoTimer=setInterval(autoMove,interval);
        oBtnLeft.css('display','none');
        oBtnRight.css('display','none');
    });
    //7.手动切换焦点
    handleChange();
    function handleChange(){
        aLi.click(function(){
            step=$(this).index();
            setBanner();
        })
    }
    //8.左右切换
    oBtnRight.click(autoMove)
    oBtnLeft.click(function(){
        if(step<=0){
            step=aDiv.length;
        }
        step--;
        setBanner();
    })

});






