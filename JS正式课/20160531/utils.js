/**
 * Created by lilonglong on 5/31/16.
 */
var utils=(function(){
    function setCss(ele,attr,value){
        ele.style[attr]=value;

    }
    function getCss(ele,attr){
        return getComputedStyle(ele,null)[attr]
    }
    function siblings(ele){
        var ary=[];
        var pre=ele.previousElementSibling;
        var next=ele.nextElementSibling;
        ary.push(pre);
        ary.push(next);
        return ary;
    }
    return{
       setCss:setCss,
        getCss:getCss,
        siblings:siblings
    }
})()