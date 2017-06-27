//定义了一个组件
//render用来指定把什么内容插入到DOM元素内部
//1 首字母大写
//2.render的返回值有且只能有一个顶级标签
var Message = React.createClass({
    render(){
        return <h1>hello</h1>
    }
});

ReactDOM.render(
    <Message/>,
    document.querySelector('#app')
)
