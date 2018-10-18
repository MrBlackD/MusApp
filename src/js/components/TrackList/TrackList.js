import React from "react";
import "./track-list.less";
import Track from "../Track/Track";
import { secondsToTime } from "../../utils/utils";

export default class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      playingTrackIndex: null,
      currentTrackIndex: null
    };
    this.audioElements = [];
    this.trackListRows = [];

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

  selectTrack(index) {
    const { currentTrack } = this;
    const { currentTrackIndex } = this.state;
    if (currentTrack) {
      currentTrack.pause();
    }
    if (currentTrackIndex == index) {
      this.setState({ currentTrackIndex: null });
      return;
    }
    this.currentTrack = this.audioElements[index];
    this.currentTrack.play();
    this.setState({ currentTrackIndex: index });
  }
  render() {
    const { tracks, currentTrackIndex } = this.state;
    return (
      <div className={"track-list"}>
        <ul>
          {tracks.map((track, index) => {
            return (
              <li key={track}>
                <Track
                  trackName={track}
                  getAudioElement={el => this.audioElements.push(el)}
                  selectTrack={() => this.selectTrack.bind(this)(index)}
                  active={currentTrackIndex == index}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
