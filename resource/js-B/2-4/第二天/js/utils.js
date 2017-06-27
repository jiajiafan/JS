/**
 * Created by xiao lei on 2016/5/15.
 */
var utils={
    /**
     *listToArray:把类数组转化成数组
     * @param arg   类数组
     * @returns []  数组
     */
    listToArray:function listToArray(arg){
        try{
            return Array.prototype.slice.call(arg);
        }catch(e){
            var ary=[];
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
            return ary;
        }
    },
    jsonParse:function jsonParse(str){
        return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    }

}