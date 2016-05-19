var utils={
    /**
     * listToArray
     * @param arg
     * @returns []
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
     *jsonParson
     * @param str(jsonString)
     * @returns jsonObject
     */
    jsonParse:function jsonParse(str){
        return "JSON" in window?JSON.parse(str):JSON.eval("("+str+")")
    }

}