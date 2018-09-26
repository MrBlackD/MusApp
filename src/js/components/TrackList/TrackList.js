import React from "react";
import "./track-list.less"
import {secondsToTime} from "../../utils/utils";
import Player from "../Player/Player";
import PropTypes from "prop-types"


export default class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            activeTrackIndex: null,
            gotDuration: false
        };

        this.trackRow = [];
        this.setTrackRow = element => {
            this.trackRow.push(element);
        };
        this.getTrackDuration = ( i ) => {
            if (this.trackRow[ i ]) return this.trackRow[ i ].duration
        };

    }

    componentDidMount() {
        fetch("http://localhost:3000/tracks").then(res => res.json()).then(res => this.setState({tracks: res}))
    }

    selectTrack(index) {
        const { activeTrackIndex } = this.state;
        const activeTrack = this.trackRow[this.state.activeTrackIndex];
        const currentTrack = this.trackRow[index];

        if(index !== activeTrackIndex){
            if(activeTrackIndex != null){
                activeTrack.pause();
                activeTrack.currentTime = 0;
            }
            currentTrack.play();
        }else{
            if(currentTrack.paused){
                currentTrack.play();
            }else{
                currentTrack.pause();
            }
        }
        this.setState({activeTrackIndex: index})
    }

    onCanPlay( ) {
        this.setState({gotDuration: true});
    }

    render() {
        const {tracks, activeTrack} = this.state;
        return (
            <div className={"track-list"}>
                <ul>
                    {tracks.map((track, index) => {
                        return <li key={track}
                                   className={track === tracks[activeTrack] ? "active" : ""}
                                   onClick={() => this.selectTrack(index)}>
                            <div className={"trackListRow"}>
                                <div className={"trackName"}>
                                    {track}
                                </div>
                                <div className={"trackDuration"}>
                                    {secondsToTime(this.getTrackDuration(index))}
                                </div>
                             </div>
                            <audio
                                ref={this.setTrackRow}
                                preload={'auto'}
                                onCanPlay={ this.onCanPlay.bind( this )}
                                src={'http://localhost:3000/tracks/' + track}>
                            </audio>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

Player.propTypes={
    track:PropTypes.string
};