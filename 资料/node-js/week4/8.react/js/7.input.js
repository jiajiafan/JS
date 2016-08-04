var Input = React.createClass({
    getInitialState(){
      return {msg:'欢迎输入'}
    },
    handleChange(event){
      this.setState({msg:event.target.value});
    },
    render(){
        return <div>
            <input type="text" value={this.state.msg} onChange={this.handleChange} />
            <p>{this.state.msg}</p>
        </div>
    }
})
ReactDOM.render(<Input/>,document.querySelector('#app'));