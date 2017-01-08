import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'

export class Button extends Component {
    render() {
        return (
            <FlatButton
                label={this.props.label}
                onTouchTap={this.props.pressHandler}
            />
        );
    }
}
