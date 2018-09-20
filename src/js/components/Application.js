import React from "react";
import TextBox from "./TextBox";
import Player from "./Player";

export default class Application extends React.Component{
    render(){
        return (
            <div>
                <h3>Текстовое поле</h3>
                <TextBox/>
                <Player track={"http://localhost:3000/tracks/gunship.mp3"}/>
            </div>
        )
    }
}