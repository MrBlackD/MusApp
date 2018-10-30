import React from "react";
import PropTypes from "prop-types";
import "./track.less";
import { secondsToTime } from "../../utils/utils";

export default class Track extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      duration: null
    };
  }
  getGradient(border) {
    const firstColor = "rgba(255,255,255,0.5)"; //"#45f319";
    const lastColor = "transparent";
    return (
      "linear-gradient(to right," +
      firstColor +
      " 0%," +
      firstColor +
      " " +
      border +
      "%, " +
      lastColor +
      " " +
      border +
      "%, " +
      lastColor +
      " 100%)"
    );
  }
  onTimeUpdate() {
    const { currentTime, duration } = this.audioElement;
    const gradientBorder = (currentTime / duration) * 100;

    if (this.trackBar !== null) {
      this.trackBar.style.backgroundImage = this.getGradient(gradientBorder);
    }
    this.setState({ currentTime: secondsToTime(currentTime) });
  }
  onCanPlay() {
    this.setState({ duration: this.audioElement.duration });
  }
  render() {
    console.log("--track render");
    const { trackName, getAudioElement, selectTrack, active } = this.props;
    const { currentTime, duration } = this.state;
    return (
      <div className={active ? "track active" : "track"}>
        <div className={"btn-play"} onClick={selectTrack}>
          {active ? "⏸" : "⏵"}
        </div>
        <div className={"track-bar"} ref={el => (this.trackBar = el)}>
          {trackName}
        </div>
        <div className={"track-time"}>
          {currentTime || secondsToTime(duration)}
        </div>
        <audio
          preload={"auto"}
          ref={el => {
            getAudioElement(el);
            this.audioElement = el;
          }}
          src={"http://localhost:3000/tracks/" + trackName}
          onCanPlay={this.onCanPlay.bind(this)}
          onTimeUpdate={this.onTimeUpdate.bind(this)}
        />
      </div>
    );
    return (
      <div>
        <div className={"playPauseBtn"} onClick={() => this.selectTrack(index)}>
          {audioElem && audioElem.paused ? "⏵" : "⏸"}
        </div>
        <div
          key={track}
          ref={element => index === playingTrackIndex && this.setLi(element)}
          className={track === tracks[playingTrackIndex] ? "active" : ""}
          onClick={e => this.setCurrentDuration.bind(this)(e, index)}
        >
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
      </div>
    );
  }
}

Track.propTypes = {
  trackName: PropTypes.string.isRequired
};
