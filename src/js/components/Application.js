import React from "react";
import TextBox from "./TextBox";
import Player from "./Player/Player";
import TrackList from "./TrackList/TrackList";
import PlayerPage from "./PlayerPage/PlayerPage";

export default class Application extends React.Component {
  render() {
    const test = [
      "тестовый",
      "коммит",
      "для",
      "проверки",
      "коммит",
      "хука",
      "с",
      "обработкой",
      "через",
      "prettier"
    ];
    return <PlayerPage />;
  }
}
