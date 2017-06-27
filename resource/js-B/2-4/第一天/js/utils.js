/**
 * Created by xiao lei on 2016/5/14.
 */
var utils={
    /**
     * listToArray:把类数组转成数组；
     * @param arg 类数组
     * @returns []  返回一个新数组；
     */
    listToArray: function listToArray(arg){
        try{
            return Array.prototype.slice.call(arg);
        }catch(e){
            var ary1=[];
            for(var i=0; i<arg.length; i++){
                ary1[ary1.length]=arg[i];
            }
            return ary1;
        }
    },
    /**
     * jsonParse: 把JSON类型的字符串转成JSON类型的对象
     * @param str JSON类型的字符串
     * @returns {Object} JSON类型的对象
     */
    jsonParse:function jsonParse(str){
        /*try..catch思想封装；
         try{
         return JSON.parse(str);
         }catch(e){
         return eval('('+str+')');
         }*/
        //属性boolean判断思想封装；
        return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    }
}