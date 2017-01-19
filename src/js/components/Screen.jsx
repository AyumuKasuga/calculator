import React, { Component } from 'react'
import {MAX_CHARS} from './App'


export class Screen extends Component {

    render(){

        let mainLineText = this.props.mainLineText

        if(mainLineText.length > MAX_CHARS && mainLineText.indexOf('.') !== -1){ // Dirty hack
            mainLineText = mainLineText.substr(0, MAX_CHARS)
        }

        return (
            <div className="screen">
                <div className="screenSpaceLine"></div>
                <div className="screenMainLine">
                    {mainLineText}
                </div>
                <div className="screenSecondLine">
                    {this.props.secondLineText}
                </div>
            </div>
        )
    }
}
