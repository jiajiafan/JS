/**
 * Created by xiao lei on 2016/5/14.
 */
window.onload=function(){
    var oTab=document.getElementById('tab');
    console.dir(oTab)
    var tHead=oTab.tHead;
    var aCells=tHead.rows[0].cells;
    var tBody=oTab.tBodies[0];
    var aRows=tBody.rows;
    var data=null;
    //1.获取并解析数据
    getDate();
    function getDate(){
        //1.创建一个对象 AJAX（Asynchronous Javascript And XML） 是与服务器交换数据并（局部更新）的艺术,在（无刷新）整个页面的情况下。
        var xml=new XMLHttpRequest;
        //2.打开地址
        xml.open('get','data.txt',false);
        //3.响应请求
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                var val=xml.responseText;
                data=utils.jsonParse(val);
            }
        }
        //4.发送请求
        xml.send();
    }
    //2.绑定数据
    bind();
    function bind(){
        /*字符串拼接方式绑定数据
        var str='';
        for(var i=0; i<data.length; i++){
            data[i].sex=data[i].sex==0?'男':'女';
            str+='<tr>\
                <td>'+data[i].name+'</td>\
                <td>'+data[i].age+'</td>\
                <td>'+data[i].score+'</td>\
                <td>'+data[i].sex+'</td>\
                </tr>';
        }
        tBody.innerHTML+=str;*/
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var oTr=document.createElement('tr');
            for(var k in data[i]){
                if(k=='sex'){
                    data[i][k]=data[i][k]==0?'男':'女';
                }
                var oTd=document.createElement('td');
                oTd.innerHTML=data[i][k];
                oTr.appendChild(oTd);
            }
            frg.appendChild(oTr);
        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeBg();
    function changeBg(){
        var bg='';
        for(var i=0; i<aRows.length; i++){//有几种情况就%几
            switch (i%3){
                case 0:
                    bg='bg1';
                    break;
                case 1:
                    bg='bg2';
                    break;
                default :
                    bg='bg3';
                    break;
            }
            aRows[i].className=bg;
        }
    }
    //4.表格排序
    function mySort(n){
        var _this=this;
        _this.flag*=-1;
        //1.类数组转成数组
        var ary=utils.listToArray(aRows);
        //2.排序  每一行中第一列的数据进行排序
        ary.sort(function(a,b){//1:从小到大 ；-1：从大到小
            console.log(arguments)
            var curInn=a.cells[n].innerHTML;
            var nexInn=b.cells[n].innerHTML;
            var curInnNum=parseFloat(a.cells[n].innerHTML);
            var nexInnNum=parseFloat(b.cells[n].innerHTML);
            if(isNaN(curInnNum) || isNaN(nexInnNum)){
                return  (curInn.localeCompare(nexInn))*_this.flag;
            }
            return (curInnNum-nexInnNum)*_this.flag;
        })
        //3.重新插入 数组中的每一项都是元素，不需要再重新创建；
        window.ary=ary;
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i])
        }
        tBody.appendChild(frg);
        frg=null;
        changeBg();
    }
    /*aCells[1].flag=-1;
    aCells[1].onclick=mySort;*/
    for(var i=0; i<aCells.length; i++){
        if(aCells[i].className=='cursor'){
            aCells[i].index=i;
            aCells[i].flag=-1;
            aCells[i].onclick=function(){
                //alert(this)
                mySort.call(this,this.index);
            }
        }

    }
}