import React from "react";
import PropTypes from "prop-types"

export default class Player extends React.Component{
    render(){
        return (
            <div>
                <audio autoPlay controls src={this.props.track}></audio>
            </div>
        )
    }
}

Player.propTypes={
    track:PropTypes.string
}