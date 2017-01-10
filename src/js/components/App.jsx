/* eslint no-eval: 0 */
/* Yes i really need `eval` in this application :) */

import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/App.css'
import {ButtonSet} from './ButtonSet'
import {Screen} from './Screen'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const DEL_BUTTON = 'DEL'
const RESULT_BUTTON = '='
const REPLACE_MAP = {
    'x': '*',
    '÷': '/'
}

export class App extends Component {

    constructor(props){
        super(props);
        this.state = this.getDefaultState()
    }

    getDefaultState(){
        return {
            screenMainLine: "",
            isResult: false
        }
    }

    addScreenSymbol(symbol){
        this.setState({
            screenMainLine: this.state.screenMainLine.concat(symbol)
        })
    }

    removeLastScreenSymbol(){
        let len = this.state.screenMainLine.length
        this.setState({
            screenMainLine: this.state.screenMainLine.substring(0, len-1)
        })
    }

    calculateResultAndShow(){
        let calculateResult = this.calculateResult()
        if(calculateResult !== null){
            this.setState({
                screenMainLine: calculateResult.toString()
            })
        }
    }

    calculateResult(){
        let filteredInput = this.state.screenMainLine
        for(let symbol in REPLACE_MAP){
            if (REPLACE_MAP.hasOwnProperty(symbol)) {
                filteredInput = filteredInput.replace(new RegExp(symbol, 'g'), REPLACE_MAP[symbol])
            }
        }
        let evalResult = null
        try{
            evalResult = eval(filteredInput)
        }catch(e){
            console.log(e)
        }
        return evalResult
    }

    buttonPressHandler(label){
        if(label===DEL_BUTTON){
            this.removeLastScreenSymbol()
        }else if(label===RESULT_BUTTON){
            this.calculateResultAndShow()
        }else{
            this.addScreenSymbol(label)
        }
    }

    render() {

        const mainButtons = [
            ['7', '8', '9'],
            ['4', '5', '6'],
            ['1', '2', '3'],
            ['.', '0', RESULT_BUTTON]
        ]

        const sideButtons = [
            [DEL_BUTTON],
            ['÷'],
            ['x'],
            ['-'],
            ['+'],
        ]

        return (
            <MuiThemeProvider>
                <div className="App">
                    <Screen mainLineText={this.state.screenMainLine}/>
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
