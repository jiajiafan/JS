var Focus = React.createClass({
    handleClick(event){
        this.refs.focus.focus();
        console.log(this.refs);
        alert(this.refs.focus.value);
    },
    render(){
        return <div>
            <input type="text" ref="focus"/>
            <button ref="btn" onClick={this.handleClick}>获得焦点</button>
        </div>
    }
})

ReactDOM.render(<Focus/>,document.querySelector('#app'));