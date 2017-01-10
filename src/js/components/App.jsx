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

        const sideButtons = [
            ['DEL'],
            ['÷'],
            ['x'],
            ['-'],
            ['+'],
        ]

        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="screen">
                        127+345
                    </div>
                    <div className="buttons">
                        <ButtonSet
                            buttons={mainButtons}
                            pressHandler={(label) => this.buttonPressHandler(label)}
                            className="mainButtonMatrix"
                        />
                        <ButtonSet
                            buttons={sideButtons}
                            pressHandler={(label) => this.buttonPressHandler(label)}
                            className="sideButtonMatrix"
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
