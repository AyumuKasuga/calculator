import React, { Component } from 'react'


export class Screen extends Component {
    render(){

        return (
            <div className="screen">
                <div className="screenSpaceLine"></div>
                <div className="screenMainLine">
                    {this.props.mainLineText}
                </div>
                <div className="screenSecondLine">
                    {this.props.secondLineText}
                </div>
            </div>
        )
    }
}
