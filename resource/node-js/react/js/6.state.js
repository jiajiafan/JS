var Person = React.createClass({
    //获取初始状态
    getInitialState(){
        //刚出生的时候很高兴
        return {happy:true};
    },
    getDefaultProps(){
      return '无名氏'
    },
    //定义一个组件实例的方法
    handleClick(){
        //当改变状态之后，如果视图中使用了此状态，那么视图也会跟着改变
        //setState是一个异步方法
        this.setState({happy:!this.state.happy},function(){
            //当状态异步完成改变后会调用此回调函数，可以在此获取最新的状态
            console.log(this.state.happy);
        });

    },
    render(){
        //状态或属性改变之后会刷新视图
        var heart = this.state.happy?'高兴':'不开心';
        return (
                <div>
                  {this.props.name}:{heart}
                  <button onClick={this.handleClick}>改变</button>
                </div>
                )
    }
})

ReactDOM.render(<Person name="菲律宾"/>,document.querySelector('#app'));