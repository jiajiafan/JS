var Person = React.createClass({
    render(){
        return (<ul>
                {
                    /*this.props.children.map(function(child){
                        return <li>{child}</li>
                    })*/
                    React.Children.map(this.props.children,function(child){
                    return <li>{child}</li>
                     })
                }
               </ul>)
    }
});

ReactDOM.render(
    <Person name="zfpx">
        <span>大毛</span>
        <span>二毛</span>
        <span>三毛</span>
    </Person>,
    document.querySelector('#app')
);


