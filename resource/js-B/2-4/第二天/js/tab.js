/**
 * Created by xiao lei on 2016/5/15.
 */
/*1.布局 2.数据获取和解析 3.绑定 4.隔行换色 5.排序 6.优化*/
window.onload=function(){
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;
    var aCells=tHead.rows[0].cells;
    var tBody=oTab.tBodies[0];
    var aRows=tBody.rows;
    var data=null;
    //2.数据获取和解析
    getDate();
    function getDate(){
        var xml=new XMLHttpRequest;
        xml.open('get','data.txt',false);
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                var val=xml.responseText;
                data=utils.jsonParse(val);
            }
        }
        xml.send();
    }
    //3.绑定
    bind();
    function bind(){
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
        tBody.innerHTML+=str;
    }
    //4.隔行换色
    changeBg();
    function changeBg(){
        for(var i=0; i<aRows.length; i++){
            var bg='';
            switch (i%3){//要求进行3行隔行换色：技巧：几种情况就%几
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
    //5.排序
    function sort(n){
        var _this=this;
        for(var i=0; i<aCells.length; i++){
            /*if(aCells[i]!=this){
                aCells[i].flag=-1;
            }*/
            //if(aCells[i]!=this)aCells[i].flag=-1;

            //当点击目前这个元素的时候，让其他元素的flag都恢复初始值；
            aCells[i].flag=i!=n?-1:this.flag;
        }
        _this.flag*=-1;
        //1.把类数组转数组
        var ary=utils.listToArray(aRows);//tr元素
        //2.排序
        ary.sort(function(a,b){
            var curInn=a.cells[n].innerHTML;
            var nexInn=b.cells[n].innerHTML;
            var curInnNum= parseFloat(a.cells[n].innerHTML);
            var nexInnNum= parseFloat(b.cells[n].innerHTML);
            if(isNaN(curInnNum) || isNaN(nexInnNum)){
                return (curInn.localeCompare(nexInn))*_this.flag;
            }
            return (curInnNum-nexInnNum)*_this.flag;
        });
        //3.重新插入
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg=null;
        changeBg();
    }
    /*aCells[1].flag=-1;
    aCells[1].onclick=function(){
        sort.call(this);
    }*/
    for(var i=0; i<aCells.length; i++){
        aCells[i].index=i;
        aCells[i].flag=-1;
        if(aCells[i].className==='cursor'){
            aCells[i].onclick=function(){
                sort.call(this,this.index);
            }
        }
    }
}