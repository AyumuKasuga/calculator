import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/App.css'
import {ButtonSet} from './ButtonSet'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export class App extends Component {

    buttonPressHandler(label){
        console.log(label)
    }

    render() {

        const mainButtons = [
            ['7', '8', '9'],
            ['4', '5', '6'],
            ['1', '2', '3'],
            ['.', '0', '=']
        ]

        return (
            <MuiThemeProvider>
                <div className="App">
                    <ButtonSet
                        buttons={mainButtons}
                        pressHandler={(label) => this.buttonPressHandler(label)}
                        name="main"
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
