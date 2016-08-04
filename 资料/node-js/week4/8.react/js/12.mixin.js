var CounterMixin = {
    getInitialState(){
        return {count:0};
    },
    handleClick(){
        this.setState({count:this.state.count + 1});
    },
}
var Counter1 = React.createClass({
    mixins:[CounterMixin],
    render(){
        return <div>
            Counter1计数: {this.state.count}
            <button onClick={this.handleClick}>增加</button>
        </div>
    }
});

var Counter2 = React.createClass({
    mixins:[CounterMixin],
    render(){
        return <div>
            Counter2计数: {this.state.count}
            <button onClick={this.handleClick}>增加</button>
        </div>
    }
});

ReactDOM.render(
    <div>
        <Counter1></Counter1>
        <Counter2></Counter2>
    </div>,document.querySelector('#app')
);