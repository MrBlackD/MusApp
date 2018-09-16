import React from "react";
import PropTypes from "prop-types";


export default class TextBox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value:""
		}
	}
	onChange(e){
		this.setState({value:e.target.value})
	}
	render(){
		const {hidden} = this.props;
		return <input type={hidden?"password":"text"} value={this.state.value} onChange={this.onChange.bind(this)}/>
	}
}

TextBox.propTypes = {
	hidden:PropTypes.bool
}