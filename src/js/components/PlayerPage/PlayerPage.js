import React from "react";
import TrackList from "../TrackList/TrackList";
import "./player-page.less"

export default class PlayerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            track:null
        }
    }
    render(){
        const {track} = this.state;
        return (
            <div className={"player-page"}>
                <TrackList onClick={(track)=>this.setState({track})} track={track}/>
            </div>
        )
    }
}