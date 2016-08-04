var utils = {};
utils.listToArray = function(likeAry){
    var ary = [];
    try{
        ary = Array.prototype.slice.call(likeAry,0);
    }catch(e){
        for(var i = 0;i<likeAry.length;i++){
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
};
utils.toJSON=function toJSON(str) {
    try {
        return JSON.parse(str)
    } catch (e) {
        return eval("(" + str + ")");
    }finally{
    "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
}