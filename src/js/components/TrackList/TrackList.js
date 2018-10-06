import React from "react";
import "./track-list.less";
import { secondsToTime } from "../../utils/utils";

export default class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      playingTrackIndex: null
    };

    this.trackListRows = [];
    this.setTrackRow = element => {
      this.trackListRows.push(element);
    };

    this.li = null;
    this.setLi = element => {
      this.li = element;
    };

    this.getTrackDuration = i => {
      if (this.trackListRows[i]) return this.trackListRows[i].duration;
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/tracks")
      .then(res => res.json())
      .then(res => this.setState({ tracks: res }));
  }

  selectTrack(index) {
    const { playingTrackIndex } = this.state;
    const playingTrack = this.trackListRows[this.state.playingTrackIndex];
    const triggeredTrack = this.trackListRows[index];

    if (index !== playingTrackIndex) {
      if (playingTrackIndex != null) {
        playingTrack.pause();
        playingTrack.currentTime = 0;
        this.li.style.backgroundImage = "";
      }
      triggeredTrack.play();
    } else {
      if (triggeredTrack.paused) {
        triggeredTrack.play();
      } else {
        triggeredTrack.pause();
      }
    }
    this.setState({ playingTrackIndex: index });
  }

  onCanPlay() {
    this.setState({ gotDuration: true });
  }

  onTimeUpdate() {
    const { playingTrackIndex } = this.state;
    const playingTrack = this.trackListRows[this.state.playingTrackIndex];
    const trackDuration = this.getTrackDuration(playingTrackIndex);
    const currentDuration = playingTrack.currentTime;
    const gradientPercent = (currentDuration / trackDuration) * 100;

    if (this.li !== null) {
      this.li.style.backgroundImage =
        "linear-gradient(to right, red 0%, red " +
        gradientPercent +
        "%, yellow " +
        gradientPercent +
        "%, yellow 100%)";
    }
  }

  setCurrentDuration(e, index) {
    //TODO проверить различия в разных браузерах
    if (this.li !== null) {
      const x = e.clientX;
      const elementWidth = this.li.clientWidth;
      const targetRewindPercent = x / elementWidth;

      const trackDuration = this.getTrackDuration(index);
      const newCurrentTime = trackDuration * targetRewindPercent;
      this.trackListRows[index].currentTime = newCurrentTime;
    }
  }

  render() {
    const { tracks, playingTrackIndex } = this.state;
    return (
      <div className={"track-list"}>
        <ul>
          {tracks.map((track, index) => {
            const audioElem = this.trackListRows[index];
            return (
              <li
                key={track}
                ref={element =>
                  index === playingTrackIndex && this.setLi(element)
                }
                className={track === tracks[playingTrackIndex] ? "active" : ""}
                onClick={e => this.setCurrentDuration.bind(this)(e, index)}
              >
                <div className={"trackListRow"}>
                  <div
                    className={"playPauseBtn"}
                    onClick={() => this.selectTrack(index)}
                  >
                    {audioElem && audioElem.paused ? ">" : "||"}
                  </div>
                  <div className={"trackName"}>{track}</div>
                  <div className={"trackDuration"}>
                    {secondsToTime(this.getTrackDuration(index))}
                  </div>
                </div>
                <audio
                  ref={this.setTrackRow}
                  preload={"auto"}
                  onCanPlay={this.onCanPlay.bind(this)}
                  onTimeUpdate={this.onTimeUpdate.bind(this)}
                  src={"http://localhost:3000/tracks/" + track}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
