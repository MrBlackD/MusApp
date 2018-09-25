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
            activeTrack: null,
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
        if(this.state.activeTrack!=null) this.trackRow[this.state.activeTrack].pause();
        this.trackRow[index].play();
        this.setState({activeTrack: index})
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
                            {track}
                            {secondsToTime(this.getTrackDuration(index))}
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