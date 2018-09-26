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

        this.li = null;
        this.setLi = element => {
            this.li = element;
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
                this.li.style.backgroundImage = '';
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

    onTimeUpdate( ) {
        const { activeTrackIndex } = this.state;
        const activeTrack = this.trackRow[this.state.activeTrackIndex];
        const trackDuration = this.getTrackDuration( activeTrackIndex );
        const currentDuration = activeTrack.currentTime;
        const gradientPercent = (currentDuration/trackDuration)*100;

        if(this.li !== null){
            this.li.style.backgroundImage = 'linear-gradient(to right, red 0%, red ' + gradientPercent + '%, yellow ' + gradientPercent + '%, yellow 100%)';
        }

    }

    render() {
        const {tracks, activeTrackIndex} = this.state;
        return (
            <div className={"track-list"}>
                <ul>
                    {tracks.map((track, index) => {
                        return <li key={track}
                                   ref={(element)=>index === activeTrackIndex && this.setLi(element)}
                                   className={track === tracks[activeTrackIndex] ? "active" : ""}
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
                                onTimeUpdate={ this.onTimeUpdate.bind( this ) }
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