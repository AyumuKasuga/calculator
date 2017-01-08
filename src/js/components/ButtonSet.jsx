import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'


export class ButtonSet extends Component {
    render() {


        let buttons = this.props.buttons.map((row, i) => (
            <div className="buttonRow" key={"row-" + this.props.name + i}>
                {row.map((label, i) => (
                    <FlatButton
                        labelStyle={{
                            color: 'white',
                            fontSize: '20px'
                        }}
                        style={{
                            margin: 'auto'
                        }}
                        label={label}
                        key={label}
                        onTouchTap={() => this.props.pressHandler(label)}
                    />
                ))}
            </div>
        ))
        return (
            <div className="buttonMatrix">
                {buttons.map((button) => (
                    button
                ))}
            </div>
        );
    }
}
