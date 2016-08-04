//定义了一个组件
var Person = React.createClass({
    propTypes: {
        //定义msg的属性类型为字符串，必须传入
        name: React.PropTypes.string.isRequired,
        gender: React.PropTypes.string.isRequired
    },
    //定义默认属性
    getDefaultProps:function(){
        //返回默认属性对象
        return {
            gender:'男'
        }
    },
    render:function(){
        return <div>
            姓名: {this.props.name}
            性别: {this.props.gender}
        </div>
    }
})
//属性存放着初始化不能在组件内部修改的数据
var xxx = {
    name:'zfpx',
    gender:'女'
}
// this.props = {name:'zfpx',gender:'女'}
// Object.assign(this.props,{gender:'男'});
//把Person组件的render方法的返回值放到app元素的内容
ReactDOM.render(
    <Person {...xxx} />,
    document.querySelector('#app')
);
/*
 * 属性是什么
 * 属性有什么特别
 * 如何传入属性
 * 在组件内容属性如何获取 this.props.name
 **/