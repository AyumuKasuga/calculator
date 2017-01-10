import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'


export class ButtonSet extends Component {
    render() {

        const rowStyle = {
            height: 100/this.props.buttons.length + '%'
        }

        let buttons = this.props.buttons.map((row, i) => (
            <div className="buttonRow" style={rowStyle} key={"row-" + this.props.name + i}>
                {row.map((label, i) => (
                    <FlatButton
                        labelStyle={{
                            color: 'white',
                            fontSize: '20px'
                        }}
                        style={{
                            margin: 'auto',
                            height: '100%',
                            width: '100%',
                            minWidth: '50px'
                        }}
                        label={label}
                        key={label}
                        onTouchTap={() => this.props.pressHandler(label)}
                    />
                ))}
            </div>
        ))
        return (
            <div className={this.props.className}>
                {buttons.map((button) => (
                    button
                ))}
            </div>
        );
    }
}
