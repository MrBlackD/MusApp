import React from "react";
import "./track-list.less"

export default class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            activeTrack: null
        }
    }
    componentDidMount() {
        fetch("http://localhost:3000/tracks").then(res => res.json()).then(res => this.setState({ tracks: res }))
    }
    selectTrack(track) {
        const { onClick } = this.props;
        onClick("http://localhost:3000/tracks/" + track);
        this.setState({ activeTrack: track })
    }
    render() {
        const { tracks,activeTrack } = this.state;
        console.log(activeTrack)
        return (
            <div className={"track-list"}>
                <ul>
                    {tracks.map((track) => {
                        return <li key={track}
                                    className={track == activeTrack ? "active" : ""}
                                    onClick={() => this.selectTrack(track)}>
                            {track}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}