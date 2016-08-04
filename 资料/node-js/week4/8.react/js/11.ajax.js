var Suggestion = React.createClass({
    getInitialState(){
      return {content:[]};
    },
    ajax(options){
        var url = options.url;
        if(options.data){
            var query = '';
            for(var attr in options.data){
                query+= (attr+'='+options.data[attr])+'&';
            }
            // query = wd=a&
            url+=((/\?/.test(url)?'&':'?')+query);
        }
        url += ('_='+Date.now());
        var callbackMethod = 'jQuery.'+Date.now();
        if(options.jsonp){
            url+=('&'+options.jsonp+'='+callbackMethod);
        }
        if(options.context){
            options.success = options.success.bind(options.context);
        }
        window[callbackMethod] =  options.success;
        var xhr = new XMLHttpRequest;
        xhr.open(options.method,url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status== 200){
                var result = xhr.responseText;
                if(options.dataType=='json'){
                    result = JSON.parse(result);
                }else if(options.dataType=='jsonp'){
                    var res = result.match(/\w+\((.+)\)/);
                    res = res[1];
                    result = JSON.parse(res);
                }
                window[callbackMethod](result);
            }
        }
        xhr.send();
    },
    handleChange(event){
        var keyword = event.target.value;
        this.ajax({
            url:'http://localhost:8080/su',
            method:'get',
            jsonp:'cb',//指定后台用来接收函数名的查询字符串参数值
            dataType:'jsonp',//告诉jquery如何处理响应xt
            context:this,
            data:{wd:keyword},
            success:function(data){
                var result = data.s;
                var lis = result.map(function(item,index){
                    return <li className="list-group-item" key={index}>{item}</li>
                })
                this.setState({content:lis});
            }
        })
    },
    render(){
        return <div>
            <input className="form-control" type="text" onChange={this.handleChange}/><br/>
            <ul className="list-group">
                {this.state.content}
            </ul>
        </div>
    }
});

ReactDOM.render(<Suggestion/>,document.querySelector('#app'));