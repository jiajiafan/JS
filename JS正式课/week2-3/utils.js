var utils = {};
utils.listToArray = function(likeAry){
    try{
        return Array.prototype.slice.call(likeAry,0)
    }catch(e){
        var ary = [];
        for(var i= 0;i<likeAry.length;i++){
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }
};

utils.toJSON = function(str){
    return  "JSON" in window ? JSON.parse(str) : eval("("+str+")");
}
