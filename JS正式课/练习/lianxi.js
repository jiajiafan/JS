window.onload=function(){
    //1.获取元素
    var oTab=document.getElementById("tab");
    var oThead=oTab.tHead;
    var tRow=oThead.rows[0];
    var tCells=tRow.cells;
    var oTbody=oTab.tBodies[0];
    var oRows=oTbody.rows;
    //2.获取数据
    var data=null;
    var xhr=new XMLHttpRequest;
    xhr.open("get","json",false)
    function jsonParse(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            data=xhr.responseText;
            data=jsonParse(data);
        }
        return data;
    }
    xhr.send();
    console.log(data);
    //3.绑定数据
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var obj=data[i];
        var tr=document.createElement("tr")
        for(var key in obj){
            var td=document.createElement("td");
            if(key=="sex"){
                td.innerHTML=obj[key]==0?"男":"女";
            }else {
                td.innerHTML = obj[key];
            }
            tr.appendChild(td)
        }
        frg.appendChild(tr)
    }
    oTbody.appendChild(frg)
    //4.表格排序
    function listToArray(arg){
        try{
            return Array.prototype.slice.call(arg)
        }catch(e){
            var ary1=[];
            for(var i=0;i<arg.length;i++){
                ary1[ary1.length]=arg[i]
            }
            return ary1
        }
    }
    function tableSort(n){
        var that=this;
        var ary=listToArray(oRows);
        ary.sort(function(a,b){
            var pre= a.cells[n].innerHTML;
            var next= b.cells[n].innerHTML;
            if(isNaN(pre)||isNaN(next)){
                return pre.localeCompare(next)*that.dian
            }
            return (parseFloat(pre)-parseFloat(next))*that.dian
        });
        for(var i=0;i<ary.length;i++){
            oTbody.appendChild(ary[i])
        }
    }
    //5.升降排序
    for(var i=0;i<tCells.length;i++){
        tCells[i].index=i;
        tCells[i].dian=-1;
        tCells[i].onclick=function(){
            this.dian*=-1;
            tableSort.call(this,this.index)
        }
    }
}