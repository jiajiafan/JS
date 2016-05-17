var utils={
    /**
     * listToArray:把类数组转成数组
     * @param arg 类数组
     * @returns [] 返回一个新数组
     */
    listToArray:function listToArray(arg){
        try{
            return Array.prototype.slice.call(arg);
        }catch(e){
            var ary1=[];
            for(var i=0;i<arg.length;i++){
                ary1[ary1.length]=arg[i];
            }
            return ary1;
        }
    },
    /**
     *jsonParson:把JSON字符串转化成JSON对象
     * @param str:JSON字符串
     * @returns {*} JSON对象
     */
    jsonParse:function jsonParse(str){
        return "JSON" in window?JSON.parse(str):JSON.eval("("+str+")")
    }

}