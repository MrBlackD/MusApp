import React from "react";
import TextBox from "./TextBox";

export default class Application extends React.Component{
    render(){
        return (
            <div>
                <h3>Текстовое поле</h3>
                <TextBox/>
            </div>
        )
    }
}