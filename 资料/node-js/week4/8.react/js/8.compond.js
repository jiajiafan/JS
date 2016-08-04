var Panel = React.createClass({
    render(){
       return <div className="panel panel-success">
                    <PanelHead content={this.props.head}>{this.props.head}</PanelHead>
                    <PanelBody content={this.props.body}>{this.props.body}</PanelBody>
              </div>
    }
})

var PanelHead = React.createClass({
    render(){
        return <div className="panel-heading">{this.props.content}</div>
    }
})

var PanelBody = React.createClass({
    render(){
        return <div className="panel-body">{this.props.children}</div>
    }
})

ReactDOM.render(<Panel head="我是头" body="我是身体" />,document.querySelector('#app'));