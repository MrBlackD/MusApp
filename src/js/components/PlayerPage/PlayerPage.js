import React from "react";
import TrackList from "../TrackList/TrackList";
import "./player-page.less";

export default class PlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null
    };
  }
  render() {
    return (
      <div className={"player-page"}>
        <TrackList />
      </div>
    );
  }
}
