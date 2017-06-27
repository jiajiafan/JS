
    var li_city=document.getElementById('li_city');
    var destination=document.getElementById('destination');
    var d_l=document.getElementById('d_l');
    var okcity=document.getElementById('okcity');
    var citys=document.getElementById('citys');
    var spans=citys.getElementsByTagName('span');
    function signchange(parent,classn,flag){
        var sign=getclass(parent,classn)[0];
        if(flag==0){
            sign.src='img/down.png';
        }else if(flag==1){
            sign.src='img/up.png';
        }
    }
    //送至哪一个区域 头部  所有的mouseover mouseout 都可以封装为一个函数方便调用 另外 hover 和代替mouseover mouseout
    li_city.onmouseover=function() {
        signchange('destination','sign',1);
        destination.className = 'showcitys city';
        d_l.style.display = 'block';
        li_city.onclick = function (ev) {
            var event = ev || window.event;
            var target = event.target || event.srcElement;
            if (target.nodeName == 'SPAN' && target.parentNode.parentNode.id == 'citys') {
                okcity.innerText = target.innerText;
                for (var s = 0; s < spans.length; s++) {
                    spans[s].className = '';
                }
                target.className = 'select';
                d_l.style.display = 'none';
            }
        }

    }
    li_city.onmouseout=function(){
        d_l.style.display='none';
        signchange('destination','sign',0);
        destination.className='city';
    }
    //我的京东
    var li3=document.getElementById('li3');
    var li3_dl=document.getElementById('li3_dl');
    var li3_spc=document.getElementById('li3_spc');
    var wdjd=document.getElementById('wdjd');
    li3.onmouseover=function(){
        signchange('li3','sign',1);
        li3_spc.style.display='block';
        li3_dl.style.display='block';
        li3.className='li3 dt li_show';
        li3_dl.onclick=function(ev){
            var event=ev||window.event;
            var target=event.target||event.srcElement;
            if(target.nodeName=="A"&&target.parentNode.parentNode.id=='myjd'||target.parentNode.id=='lis_p'||target.parentNode.id=='m'){
                li3_spc.style.display='none';
                li3_dl.style.display='none';
                li3.className='li3 dt';
                signchange('li3','sign',0);
            }
        }
    }
    li3.onmouseout=function(){
        li3_spc.style.display='none';
        li3_dl.style.display='none';
        li3.className='li3 dt';
        signchange('li3','sign',0);
    }
    //li6手机京东
    var li6=document.getElementById('li6');
    var li6_sjjd=document.getElementById('li6_sjjd');
    var li6_span=document.getElementById('li6_span');
    li6.onmouseover=function(){
        li6.className='dt  li_show';
        signchange('li6','sign',1);
        li6_sjjd.style.display='block';
        li6_span.className='iphone rp';
        li6.onclick=function(ev){
            var event=ev||window.event;
            var target=event.target||event.srcElement;
            if(target.nodeName=="A"&&target.parentNode.id=='li6_sjjd'){
                li6.className='dt';
                signchange('li6','sign',0);
                li6_sjjd.style.display='none';
                li6_span.className='iphone bp';
            }
        }

    }
    li6.onmouseout=function(){
        li6.className='dt';
        signchange('li6','sign',0);
        li6_sjjd.style.display='none';
        li6_span.className='iphone bp';

    }
    //关注京东
    var li7=document.getElementById('li7');
    var li7_gzjd=document.getElementById('li7_gzjd');
    li7.onmouseover=function(){
        signchange('li7','sign',1);
        li7.className='dt gy li_show';
        li7_gzjd.style.display='block';
    }
    li7.onmouseout=function(){
        signchange('li7','sign',0);
        li7.className='dt gy';
        li7_gzjd.style.display='none';
    }
    //客服服务
    var li8=document.getElementById('li8');
    var li8_kffw=document.getElementById('li8_kffw');
    li8.onmouseover=function(){
        signchange('li8','sign',1);
        li8.className='dt gy li_show';
        li8_kffw.style.display='block';
        li8.onclick=function(ev){
            var event=ev||event;
            var target=event.target||event.srcElement;
            if(target.nodeName=='A'&&target.parentNode.id=='li8_kffw'){
                signchange('li8','sign',0);
                li8.className='dt gy';
                li8_kffw.style.display='none';
            }
        }
    }
    li8.onmouseout=function(){
        signchange('li8','sign',0);
        li8.className='dt gy';
        li8_kffw.style.display='none';
    }
    //网站导航
    var li9=document.getElementById('li9');
    var li9_zndh=document.getElementById('li9_zndh');
    li9.onmouseover=function(){
        signchange('li9','sign',1);
        li9.className='dt gy li_show';
        li9_zndh.style.display='block';
        li9.onclick=function(ev){
            var event=ev||event;
            var target=event.target||event.srcElement;
            if(target.nodeName=='A'&&target.parentNode.parentNode.parentNode.parentNode.parentNode.id=='li9_zndh'){
                signchange('li9','sign',0);
                li9.className='dt gy';
                li9_zndh.style.display='none';
            }
        }
    }
    li9.onmouseout=function(){
        signchange('li9','sign',0);
        li9.className='dt gy';
        li9_zndh.style.display='none';
    };
    //搜索
    var key=document.getElementById('key');
    var search_list=document.getElementById('search_list');
    var search_li=search_list.getElementsByTagName('li');
    var search2015=document.getElementById('search2015');
    var btn_search=document.getElementById('btn_sch');
    var Script=null;
    key.onfocus=function(){
        if(key.value=='秘密花园'){
            key.value='';
        }
    };
    key.onkeyup=function(){
        search_list.style.display='block';
        if(Script){
            document.body.removeChild(Script);
        }
        var Url='http://suggestion.baidu.com/su?cb=callback&wd='+key.value+'&_='+Math.random();
        Script=document.createElement('script');
        Script.src=Url; //记住 此处出错
        document.body.appendChild(Script);
    };
    function callback(json){
        search_list.innerHTML='';
        for(var v=0;v<json.s.length;v++){
            search_list.innerHTML+='<li>'+json.s[v]+'</li>';
        }
    }
    key.onblur=function(){
        if(key.value==''){
            key.value='秘密花园';
        }
    }

    search_list.onclick=function(ev){
        var event=ev||event;
        var target=event.target||event.srcElement;
        if(target.nodeName=='LI'&&target.parentNode.id=='search_list'){
            key.value=target.innerHTML;
            search_list.style.display='none';
        }
    }
    btn_search.onclick=function(){
        search_list.style.display='none';
    }
//Nav2015
    var mygwc=document.getElementById('mygwc');
    var mygw_dd=document.getElementById('mygw_dd');
    var gwc=document.getElementById('gwc');
    mygwc.onmouseover=function(){
        gwc.className='gwc_show';
        mygw_dd.style.display='block';
        mygw_dd.className='gwc_show';
    }
    mygwc.onmouseout=function(){
        gwc.className='';
        mygw_dd.style.display='none';
        mygw_dd.className='';
    }

    $(function(){
        //商品分类显示top随滚动轴自由定位

        $('#gitems>li').mouseover(function(){
            var _this=$(this);
            var index=_this.index();
            var gsdp1=$('.gs_drop1');
            var gsdp=document.getElementById('goodsdp');
            var scrollTop=$(document).scrollTop();
            var gsofftop=offsetTL(gsdp).top;
            if(scrollTop>=gsofftop){
                gsdp1.eq(index).get(0).style.display='block';
                gsdp1.eq(index).get(0).style.top=-index*31+(scrollTop-gsofftop)+'px';
            }else{
                gsdp1.eq(index).get(0).style.display='block';
                gsdp1.eq(index).get(0).style.top=-index*31+'px';
            }
        })
        $('#gitems>li').mouseout(function(){
            var _this=$(this);
            var index=_this.index();
            var gsdp1=$('.gs_drop1');
            gsdp1.eq(index).get(0).style.display='none';
        })
        //大图闪动JQ
        var flag=0;
        var x1=0;
        var timeq=null;
        function moveq(target){
            $('.bigimg .nav li').eq(target).addClass('active').siblings().removeClass('active');
            $('.bigimg .con li').eq(target).stop().fadeIn(100,function(){x1=0;}).siblings().hide();
        }
        function automove(){
            flag++;
            if(flag>=$('.bigimg .con li').length){
                flag=0;
            }
            moveq(flag);
        }
        timeq=setInterval(automove,4000);
        $('.bigimg .left').click(function(){
            clearInterval(timeq);
            if(x1==0){
                flag--;
                if(flag<0){
                    flag=$('.bigimg .con li').length-1;
                }
                moveq(flag);
                x1=1;
            }
            timeq=setInterval(automove,4000);
        })
        $('.bigimg .right').click(function(){
            clearInterval(timeq);
            if(x1==0){
                flag++;
                if(flag>=$('.bigimg .con li').length){
                    flag=0;
                }
                moveq(flag);
                x1=1;
            }
            timeq=setInterval(automove,4000);
        })
        $('.bigimg .nav li').hover(function(){
            clearInterval(timeq);
            var _index=$('.bigimg .nav li').index(this);
//            var _this=$(this).index();
            flag=_index;
            moveq(flag);
        },function(){
            clearInterval(timeq);
            timeq=setInterval(automove,4000);
        })
        $('.bigimg').hover(function(){
            clearInterval(timeq);
            $('.bigimg p').stop().fadeIn(600);
        },function(){
            clearInterval(timeq);
            timeq=setInterval(automove,4000);
            $('.bigimg p').stop().fadeOut(400);
        })
        //话费 机票 电影票 背景自主地位
        var lsimglen=$('.lsimg').length;
        for(var s=0;s<lsimglen;s++){
            $('.lsimg').eq(s).css({'background-position':0+'px '+(-25*s)+'px'})
        }
        //tab JQ扩展写法
        $.fn.extend({
            Tab:function(){
                var $_this=$(this);
                $_this.find('.tit>li').mouseover(function(){
                    var i=$_this.find('.tit>li').index(this);
                    $_this.find('.tit>li').eq(i).addClass('tit_shsl').siblings().removeClass('tit_shsl');
                    $_this.find('.lfcon>li').eq(i).addClass('show').siblings().removeClass('show');
                })
            }
        })
        var ls_box=$('#ls_box');
        ls_box.Tab();
        //话费  机票 电影票 游戏mouseover
        var $move=$('.lsflag');
        var time=null; var time2=null;
        var fg1=null;
        var $shwrap=$('.shwrap');
        $shwrap.mouseover(function(ev){
            var event=ev||window.event;
            var from=event.fromElement||event.relatedTarget;
            while(from){
                if(this==from){
                    return false;
                }
                from=from.parentNode;
            }
            fg1=null;
        })
        $shwrap.mouseout(function(ev){
            var event=ev||window.event;
            var to=event.toElement||event.relatedTarget;
            while(to){
                if (this==to) {
                    return false;
                };
                to=to.parentNode;
            }
            fg1=4;
        })

        $move.mouseover(function () {
            clearInterval(time);
            var _this = $(this);
            var i = $move.index(this);
            if(fg1!=4){
                lfdown(i);
            }else if(i!=3){
                lfdown(i);
            }

//            if(fg1==4){
//                lfdown(3);
//            }
            function lfdown(i){
                ls_box.find('.tit>li').eq(i).addClass('tit_shsl').siblings().removeClass('tit_shsl');
                ls_box.find('.lfcon>li').eq(i).addClass('show').siblings().removeClass('show');
                var s = 0;
                time = setInterval(function () {
                    s += 15;
                    if (s >= 209) {
                        s = 209;
                        clearInterval(time);
                    }
                    $('.shwrap').scrollTop(s);
                }, 2)
            }
        })

        //X号删除
        var $btn_gb=$('.btn_gb');
        $btn_gb.click(function(){
            fg1=4;
            clearInterval(time2);
            var s=209;
            time2=setInterval(function(){
                s-=15;
                if(s<=0){
                    s=0;
                    clearInterval(time2);
                }
                $('.shwrap').scrollTop(s);
            },1)
        })
        //Tab
        //话费
        $hflx=$('.hmtel');
        $llipt=$('.hmtel2');
        foAndbl($hflx,'移动、联通、电信');
        foAndbl($llipt,'移动、联通、电信');
        function foAndbl(jqobj,val){
            jqobj.focus(function(){
                $this=$(this);
                if($this.val()==val){
                    $this.val('')
                }
            })
            jqobj.blur(function(){
                $this=$(this);
                if($this.val()==null||$this.val()==''){
                    $this.val(val);
                }
            })
        }
        $('#hf').mouseover(function(){
            $(this).addClass('hfllshow').siblings().removeClass('hfllshow');
            $('.llk').fadeOut('fast');
            $('.hfk').fadeIn('fast');
        })
        $('#ll').mouseover(function(){
            $(this).addClass('hfllshow').siblings().removeClass('hfllshow');
            $('.hfk').fadeOut('fast');
            $('.llk').fadeIn('fast');
        });

        var $jqcheck=$('#jqfcche');
        $jqcheck.click(function(){
            if($jqcheck.is(':checked')){
                $('#jpfc').fadeIn('fast');
            }else{
                $('#jpfc').fadeOut('fast');
            }
        })
        var $gjfc=$('#gjjqfcche');
        $gjfc.click(function(){
            if($gjfc.is(':checked')){
                $('#gjjpfc').fadeIn('fast');
            }else{
                $('#gjjpfc').fadeOut('fast');
            }
        })
        //机票
        var $span=$('#lfli2>p>span');
        $span.mouseover(function(){
            var _this=$(this);
            var i=_this.index();
            _this.addClass('hfllshow').siblings().removeClass('hfllshow');
            var $lfllk=$('.lfwuyong>.llk');
            $lfllk.eq(i).fadeIn(100).siblings().fadeOut(100);
        })
        //电影票
        var $span_li3=$('#lfli3>p>span');
        var $llk_li3=$('#lfli3>div>.dycon');
        $span_li3.mouseover(function(){
            var _this=$(this);
            var i=_this.index();
            _this.addClass('hfllshow').siblings().removeClass('hfllshow');
            $llk_li3.eq(i).fadeIn(100).siblings().fadeOut(100);
        })
        //游戏 以后封装函数
        var $span_li4=$('#lfli4>p>span');
        var $llk_li4=$('#lfli4>div>.llk');
        $span_li4.mouseover(function(){
            var _this=$(this);
            var i=_this.index();
            _this.addClass('hfllshow').siblings().removeClass('hfllshow');
            $llk_li4.eq(i).fadeIn(100).siblings().fadeOut(100);
        })
        //今日推荐
        var fir=$('.tjul li:first').clone();
        var las=$('.tjul li:last').clone();
        var $tjul=$('.tjul');
        var tjanm=false;
        var x=1;
        $tjul.append(fir);
        $tjul.prepend(las);
        var $divjt=$('.divjt')
        var tjliw=$('.tjul li').width();
        var $tjwwap=$('#tjwrap');
        $divjt.scrollLeft(tjliw);
        function move(){
            $divjt.stop().animate({scrollLeft:tjliw*x},function(){tjanm=true;})
        }
        $tjwwap.mouseover(function(ev){
        	var event=ev||window.event;
                    var from=event.fromElement||event.relatedTarget;
                    while(from){
                        if(this==from){
                            return false;
                        }
                        from=from.parentNode;
                    }
            $('.tjleft').stop().fadeIn(100);
            $('.tjright').stop().fadeIn(100);
        })
        $tjwwap.mouseout(function(ev){
        	 var event=ev||window.event;
                    var to=event.toElement||event.relatedTarget;
                    while(to){
                        if (this==to) {
                            return false;
                        };
                        to=to.parentNode;
                    }
            $('.tjleft').stop().fadeOut(100);
            $('.tjright').stop().fadeOut(100);
        })
        $('.tjleft').click(function(){
            x--;
            if(x<0){
                x=$('.tjul li').length-3;
                $divjt.scrollLeft(tjliw*(x+1));
            }
            move();
        })
        $('.tjright').click(function(){
            x++;
            if(x>=$('.tjul li').length){
                x=2;
                $divjt.scrollLeft(tjliw);
            }
            move();
        })
        //floor楼层开始
        function bgtb(obj){
            var s=obj.find('.themes a').length;
            for(var m=0;m<s;m++){
                obj.find('.themes a').eq(m).css({'background-position':0+'px '+(-26)*m+'px'})
            }
        }
        var $clothes=$('#clothes');
        var $cosmetics=$('#cosmetics');
        var $mobiles=$('#mobiles');
        var $electronics=$('#electronics');
        var $dfs=$('#digitalsfloorStyleA');
        var $sport=$('#sports');
        var $livings=$('#livings');
        var $babys=$('#babys');
        var $foods=$('#foods');
        var $books=$('#books');
        var $life=$('#life');
        bgtb($clothes);
        bgtb($cosmetics);
        bgtb($mobiles);
        bgtb($electronics);
        bgtb($dfs);
        bgtb($sport);
        bgtb($livings);
        bgtb($babys);
        bgtb($foods);
        bgtb($books);
        bgtb($life);
        $.fn.extend({
            imgRoll:function(){
                var $this=$(this);
                var x=1;
                var isau=true;
                var n=0;
                var timer1=null;
                var imgw=$this.find('.con li').width();
                //复制插入节点
                var fir=$this.find('.con li:first').clone();
                var las=$this.find('.con li:last').clone();
                $this.find('.con').append(fir);
                $this.find('.con').prepend(las);
                $this.scrollLeft(imgw);//初始位置
                //公共部分
                function move(){
                    $this.find('.nav li').eq(n).addClass('select').siblings().removeClass('select');
                    $this.stop().animate({scrollLeft:imgw*x},function(){
                        isau=true;
                    })
                }
                //点击左
                $this.find('.left').click(function(){
                    clearInterval(timer1);
                    if(isau){
                        isau=false;
                        x--;
                        if(x<0){
                            x=$this.find('.con li').length-3;
                            $this.scrollLeft(imgw*(x+1));
                        }
                        n--;
                        if(n<0){
                            n=$this.find('.nav li').length-1;
                        }
                        move();
                    }
                    automove();
                })
                //点击右
                $this.find('.right').click(function(){
                    clearInterval(timer1);
                    if(isau){
                        isau=false;
                        x++;
                        if(x>=$this.find('.con li').length){
                            x=2;
                            $this.scrollLeft(imgw);
                        }
                        n++;
                        if(n>=$this.find('.nav li').length){
                            n=0;
                        }
                        move();
                    }
                    automove();
                })
                $this.find('.nav li').mouseover(function(){
                    clearInterval(timer1);
                    var ind=$this.find('.nav li').index(this);
                    n=ind;
                    x=n+1;
                    move();

                })
                automove();
                function automove(){
                    timer1=setInterval(function(){
                        x++;
                        if(x>=$this.find('.con li').length){
                            x=2;
                            $this.scrollLeft(imgw);
                        }
                        n++;
                        if(n>=$this.find('.nav li').length){
                            n=0;
                        }
                        move();
                    },3000)
                }
                $this.mouseover(function(ev){
                    var event=ev||window.event;
                    var from=event.fromElement||event.relatedTarget;
                    while(from){
                        if(this==from){
                            return false;
                        }
                        from=from.parentNode;
                    }
                    clearInterval(timer1);
                    $this.find('.left').get(0).style.display='block';
                    $this.find('.right').get(0).style.display='block';
                })
                $this.mouseout(function(ev){
                    var event=ev||window.event;
                    var to=event.toElement||event.relatedTarget;
                    while(to){
                        if (this==to) {
                            return false;
                        };
                        to=to.parentNode;
                    }
                    clearInterval(timer1);
                    automove();
                    $this.find('.left').get(0).style.display='none';
                    $this.find('.right').get(0).style.display='none';
                })
            }
        })
        $('#flrli3').imgRoll();
        $('#fl2li1').imgRoll();
        $('#fl3li1').imgRoll();
        $('#fl4li1').imgRoll();
        $('#fl5li1').imgRoll();
        $('#fl6li1').imgRoll();
        $('#fl7li1').imgRoll();
        $('#fl8li1').imgRoll();
        $('#fl9li1').imgRoll();
        $('#fl10li1').imgRoll();
        $('#fl11li1').imgRoll();
        $('#fl11li2').imgRoll();
        $.fn.extend({
            floorTab:function(){
                var $this=$(this);
                var $fj=$this.find('.fltit_ul>li');
                $fj.mouseover(function(){
                    var i=$fj.index(this);
                    $fj.eq(i).find('a').addClass('flliselect').end().siblings().find('a').removeClass('flliselect');
                    $fj.eq(i).find('span').hide().end().siblings().find('span').show();
                    var $flm = $this.find('.flr_main>li');
                    $flm.eq(i).show();
                    $flm.eq(i).siblings().hide();
                })
            }
        })
        $clothes.floorTab();
        $cosmetics.floorTab();
        $mobiles.floorTab();
        $electronics.floorTab();
        $dfs.floorTab();
        $sport.floorTab();
        $livings.floorTab();
        $babys.floorTab();
        $foods.floorTab();
        $books.floorTab();
        $('.cd_ul li').mouseover(function(ev){
            var event=ev||window.event;
            var from=event.fromElement||event.relatedTarget;
            while(from){
                if(this==from){
                    return false;
                }
                from=from.parentNode;
            }
            var _this=$('.cd_ul li');
            var index=$('.cd_ul li').index(this);
            _this.eq(index).find('.cd_yd ').stop().animate({marginLeft:'-15px'},500);
        })

        $('.cd_ul li').mouseout(function(ev){
            var event=ev||window.event;
            var to=event.toElement||event.relatedTarget;
            while(to){
                if (this==to) {
                    return false;
                };
                to=to.parentNode;
            }
            var _this=$('.cd_ul li');
            var index=$('.cd_ul li').index(this);
            var py=_this.eq(index).find('.cd_yd ').css('marginLeft');
            _this.eq(index).find('.cd_yd').stop().animate({marginLeft:'0px'},500);
        });

        var sxtime1=null , sxtime2=null, sxtime3=null;
        var $sxgd=$('.sxwrap');
        var $sxul=$('.sxul');
        var $sxul2=$('.sxul2');
        $sxul2.html($sxul.clone());
        var sxli_height=$('.sxul li').get(0).offsetHeight;
        // alert(sxli_height)
        function sxclear(){
            clearTimeout(sxtime1);
            clearInterval(sxtime2);
            clearInterval(sxtime3);
        }

        function movedown(){//向下滚动
            $sxgd[0].scrollTop--;
            if($sxgd[0].scrollTop<=0){
                $sxgd[0].scrollTop=$sxul[0].offsetHeight;
            }
            if($sxgd[0].scrollTop%(sxli_height+20)==0){
                sxclear();
                // alert($sxgd[0].scrollTop);
                sxtime1=setTimeout(function(){
                    sxtime2=setInterval(movedown,10)
                },2000);
            }
        }
        // movedown();
        sxtime3=setInterval(movedown,10);
        $sxgd.mouseover(function(){
            sxclear();
        });
        $sxgd.mouseout(function(){
            sxclear();
            sxtime1=setTimeout(function(){
                sxtime2=setInterval(movedown,10);
            },2000)
        })
        //楼层结束
        $.fn.extend({
			tc:function(){
				var _this=$(this);
				_this.hover(
//					var _this2=$(this);
					function(){
						_this.find('.tbtc').css({left:'-60px',background:'#b61d1d'});
						_this.find('.tab_ico').css('background-color','#b61d1d');
					},function(){
						_this.find('.tbtc').css({left:'35px',background:'#7a6e6e'});
						_this.find('.tab_ico').css('background-color','#7a6e6e');
					})				
			}
		})
		$('#jdtb1').tc();
		$('#jdtb2').tc();
		$('#jdtb3').tc();
		$('#jdtb4').tc();
		$('#jdtb5').tc();
		$('#jdtb6').tc();
		$('.jdtb1').eq(4).click(function(){
//			document.documentElement.scrollTop=0;
//			document.body.scrollTop=0;
			$('html,body').stop().animate({scrollTop:'0'},500);
		})
		//精细修改
		//猜你喜欢
//		$.easing.def="easeInQuad";
		$('#cnxh').mouseover(function(ev){
			var event=ev||window.event;
			var from=event.fromElement||event.relatedTarget;
            while(from){
                if(this==from){
                    return false;
                }
                from=from.parentNode;
            }            
            var $hyp=$('#hyp');
            $hyp.css('right','1210px');  
            //未解决
//        	$hyp.stop().animate({right:'-1px'},{          		  	
//        		  	duration: 1000,
//        		  	easing: 'swing',          		  	
//  				complete: function(){}
//        	});
//			$hyp.stop().animate({right:'-1px'},1000);
          	$hyp.stop().animate({right:'-1px'},1000,'swing');            			
		})
		//楼层左边的图像渐变闪过
//		$('.flr_goods').find('.jianbian').eq()
		$.fn.extend({
			jbsg:function(){
				var _this=$(this);
				_this.find('.flga').mouseover(function(ev){
					var event=ev||window.event;
					var from=event.fromElement||event.relatedTarget;
					while(from){
						if(this==from){
							return false;
						}
						from=from.parentNode;
					}
					_this.find('.jianbian').animate({left:'350px'},800);													
				})
				_this.find('.flga').mouseout(function(ev){
					var event=ev||window.event;
					var to=event.toElement||event.relatedTarget;
					while(to){
						if(this==to){
							return false;
						}
						to=to.parentNode;
					}
					_this.find('.jianbian').css('left','-200px');
				})
			}
				
			
		})
//		var $clothes=$('#clothes');
//      var $cosmetics=$('#cosmetics');
//      var $mobiles=$('#mobiles');
//      var $electronics=$('#electronics');
//      var $dfs=$('#digitalsfloorStyleA');
//      var $sport=$('#sports');
//      var $livings=$('#livings');
//      var $babys=$('#babys');
//      var $foods=$('#foods');
//      var $books=$('#books');
//      var $life=$('#life');
        var $fl11_1=$('#fl11_1');
        var $fl11_2=$('#fl11_2');
		$clothes.jbsg();
		$cosmetics.jbsg();
        $mobiles.jbsg();
        $electronics.jbsg();
        $dfs.jbsg();
        $sport.jbsg();
        $livings.jbsg();
        $babys.jbsg();
        $foods.jbsg();
        $books.jbsg();
        $fl11_1.jbsg();
        $fl11_2.jbsg();
		
		
		//左边楼层		
		var $eli=$('.elevator ul li');
		$eli.mouseover(function(){						
			var index=$eli.index(this);
			var title=$eli.eq(index).find('.fdis')[0].getAttribute('title');
			$eli.find('.fdis').eq(index).html(title).css({'color':'white','fontSize':'12px'});
			$eli.eq(index).find('.etitle').addClass('bz');				
			$eli.click(function(){
				var cindex=$eli.index(this);
				$eli.eq(cindex).find('.etitle').show().end().siblings().find('.etitle').hide();
				var oftl=offsetTL($('.floor .flr_goods').eq(cindex)[0]).top;
				$('html,body').stop().animate({scrollTop:oftl},800);
//				document.documentElement.scrollTop=oftl;
//				document.body.scrollTop=oftl;
			})
		})
		$eli.mouseout(function(){
			var index=$eli.index(this);
			var title=$eli.eq(index).find('.fdis')[0].getAttribute('abc');
			$eli.find('.fdis').eq(index).html(title).css({'color':'#666','fontSize':'14px'});
			$eli.eq(index).find('.etitle').removeClass('bz');
		})
		var _clothes=$('#clothes')[0];
        var _cosmetics=$('#cosmetics')[0];
        var _mobiles=$('#mobiles')[0];
        var _electronics=$('#electronics')[0];
        var _dfs=$('#digitalsfloorStyleA')[0];
        var _sport=$('#sports')[0];
        var _livings=$('#livings')[0];
        var _babys=$('#babys')[0];
        var _foods=$('#foods')[0];
        var _books=$('#books')[0];
        var _life=$('#life')[0];		
		function lcxs(i){
			$('.elevator ul li').eq(i).find('.etitle').show().end().siblings().find('.etitle').hide();
//			$('.flimg').eq(i).animate({backgroundPosition:'0px 0px'},500);
			$('.flr_goods').eq(i).find('.flimg').css('background-position','0px 0px').end().siblings().find('.flimg').css('background-position','0px -35px');
		}
		window.onload=window.onscroll=window.onresize=function(){
			var scroll_top=document.documentElement.scrollTop||document.body.scrollTop;
			var wch=document.documentElement.clientHeight;			
			var jztop=offsetTL(_clothes).top-wch;
			var tp2=offsetTL(_cosmetics).top-wch;
			var tp3=offsetTL(_mobiles).top-wch;
			var tp4=offsetTL(_electronics).top-wch;
			var tp5=offsetTL(_dfs).top-wch;
			var tp6=offsetTL(_sport).top-wch;
			var tp7=offsetTL(_livings).top-wch;
			var tp8=offsetTL(_babys).top-wch;
			var tp9=offsetTL(_foods).top-wch;
			var tp10=offsetTL(_books).top-wch;
			var tp11=offsetTL(_life).top-wch;
			
			if(scroll_top<=jztop){
				$('.elevator').hide();
			}else if(scroll_top>jztop&&scroll_top<=(tp11+_life.offsetHeight)){//1楼
				$('.elevator').show();
				lcxs(0);
				if(scroll_top>tp2+wch/2){lcxs(1);}
				if(scroll_top>tp3+wch/2){lcxs(2);}
				if(scroll_top>tp4+wch/2){lcxs(3);}
				if(scroll_top>tp5+wch/2){lcxs(4);}
				if(scroll_top>tp6+wch/2){lcxs(5);}
				if(scroll_top>tp7+wch/2){lcxs(6);}
				if(scroll_top>tp8+wch/2){lcxs(7);}
				if(scroll_top>tp9+wch/2){lcxs(8);}
				if(scroll_top>tp10+wch/2){lcxs(9);}
				if(scroll_top>tp11+wch/2){lcxs(10);}							
			}else if(scroll_top>(tp11+_life.offsetHeight+wch)){
				$('.elevator').hide();
			}
		}
		//时钟
			$(function(){
		var cvs=document.getElementById('cvs');
		var cvs2=document.getElementById('cvs2');
		var ctx2=cvs2.getContext('2d');
		var ctx=cvs.getContext('2d');
		function colock(){
			ctx.clearRect(0,0,70,70);
			var time=new Date();
			var h=time.getHours();
			var m=time.getMinutes();
			var s=time.getSeconds();
			h>11?h-12:h;
			h=h+(m/60);
			m=m+(s/60);
				//2.钟盘圆
			ctx.beginPath();
			ctx.arc(35,35,30,0,360,false);
			ctx.strokeStyle='white';
			ctx.lineWidth=8;	
			ctx.stroke();
			ctx.closePath();
				//5.时针
			ctx.save();
			ctx.beginPath();
			ctx.translate(35,35);
			ctx.rotate(h*30*Math.PI/180);
			ctx.moveTo(0,2);
			ctx.lineTo(0,-13);
			ctx.strokeStyle='white';
			ctx.lineWidth=6;
			ctx.stroke();
			ctx.closePath();
		
			ctx.beginPath();
			ctx.arc(0,-13,3,0,360,false);
			ctx.fillStyle='white';
			ctx.fill();
			ctx.closePath();
		
			ctx.beginPath();
			ctx.arc(0,2,3,0,360,false);
			ctx.fillStyle='white';
			ctx.fill();
			ctx.closePath();	
			ctx.restore();
				//6.分针
			ctx.save();
			ctx.beginPath();
			ctx.translate(35,35);
			ctx.rotate(70*m*6*Math.PI/180);
			ctx.moveTo(0,2);
			ctx.lineTo(0,-18);
			ctx.strokeStyle='white';
			ctx.lineWidth=6;
			ctx.stroke();
			ctx.closePath();
		
			ctx.beginPath();
			ctx.arc(0,-18,3,0,360,false);
			ctx.fillStyle='white';
			ctx.fill();
			ctx.closePath();
		
			ctx.beginPath();
			ctx.arc(0,2,3,0,360,false);
			ctx.fillStyle='white';
			ctx.fill();
			ctx.closePath();
			ctx.restore();	
		}
		var clock_s=0;
		function colock1(){
			ctx2.clearRect(0,0,70,70);
			clock_s+=2;
			if(clock_s>=360){
				clock_s=0;
			}
			ctx2.save();
			ctx2.beginPath();
			ctx2.translate(35,35);
			ctx2.rotate(clock_s*Math.PI/180);
			ctx2.arc(0,-30,2,0,360,false);
			ctx2.fillStyle='#5b5150';
			ctx2.fill();
			ctx2.closePath();
			ctx2.restore();
		}
		setInterval(colock,1000);
		setInterval(colock1,50);
	})
    })

