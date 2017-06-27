var MessageBox = React.createClass({
    getDefaultProps(){//设置默认属性
        console.log('1. 设置默认属性=getDefaultProps');
        return {init:2};
    },
    getInitialState(){//设置初始状态
      console.log('2. 设置初始状态=getInitialState');
      return {count:this.props.init}
    },
    componentWillMount(){
        console.log('3. 组件将要被渲染=componentWillMount');
    },
    handleClick(){
      //修改状态
       this.setState({count:this.state.count+1});
    },
    killByMyself(){
        ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
    },
    render(){
        console.log('4. 把组件渲染到界面上=render');
        return <div>
            当前计数:{this.state.count}<br/>
            <button onClick={this.handleClick}>增加</button>
            <button onClick={this.killByMyself}>删除此组件</button>
            <SubMessage count={this.state.count}/>
        </div>
    },
    componentDidMount(){
        console.log('5. 渲染完成=componentDidMount');
    },
    shouldComponentUpdate(netProps,nextState){
        console.log('6. 状态或属性改变时是否需要更新=shouldComponentUpdate');
        if(nextState.count<=10){
            return true;//此方法返回true表示继续更新
        }else{
            return false;//否则不再更新视图
        }
    },
    componentWillUpdate(){
        console.log('7. 组件将要被更新=componentWillUpdate');
    },
    componentDidUpdate(){
        console.log('8. 组件已经更新=componentDidUpdate');
    },
    componentWillUnmount(){
        console.log('9. 组件将要被删除=componentWillUnmount');
    }
})

var SubMessage = React.createClass({
    componentWillReceiveProps(){
        console.log('1.子组件 子组件收到新的属性=componentWillReceiveProps');
    },
    shouldComponentUpdate(nextProps,nextState){
        console.log('2.子组件 子组件是否需要更新=shouldComponentUpdate');
        if(nextProps.count<=5){
            return true;
        }else{
            return false;
        }
    },
    render(){
        return <div>子计数器:{this.props.count}</div>
    }
})


ReactDOM.render(<MessageBox />,document.querySelector('#app'));