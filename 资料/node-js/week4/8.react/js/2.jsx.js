// 1. JSX js+xml 是一种将JS和HTML混合编写的一种形式,互相嵌套
// 1. < html
// 2. { js代码
var persons = ['林黛玉','刘德华','王楠'];
//使用内联样式的时候需要让style 等于一个对象
var style = {color:'red'};
//有且只能有一个顶级元素
//当使用一个class类的时候必须使用className属性等于一个类名
ReactDOM.render(
    <div style={style} className="blue">
        {
            persons.map(function(person,index){
                return <div key={index}>{person}</div>
            })
        }
    </div>,
    document.querySelector('#app')
);