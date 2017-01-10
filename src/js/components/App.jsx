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
const CLR_BUTTON = 'CLR'
const RESULT_BUTTON = '='
const REPLACE_MAP = {
    '⨉': '*',
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
            screenSecondLine: "",
            delButton: DEL_BUTTON,
        }
    }

    tryCalculate(){
        let newResult = this.calculateResult()
        let screenSecondLineText = ''
        if(newResult !== null && newResult.toString() !== this.state.screenMainLine){
            screenSecondLineText = newResult
        }
        this.setState({screenSecondLine: screenSecondLineText.toString()})
    }

    addScreenSymbol(symbol){
        let screenMainLine = this.state.screenMainLine

        if(this.state.delButton === CLR_BUTTON){  /* we have result on the screen, let's clear it */
            screenMainLine = ''
            this.setState({
                delButton: DEL_BUTTON,
            })
        }

        this.setState({
            screenMainLine: screenMainLine.concat(symbol)
        }, this.tryCalculate)
    }

    flushScreen(){
        this.setState({screenMainLine: ''})
    }

    removeLastScreenSymbol(){
        let len = this.state.screenMainLine.length
        this.setState({
            screenMainLine: this.state.screenMainLine.substring(0, len-1)
        }, this.tryCalculate)
    }

    calculateResultAndShow(){
        let calculateResult = this.calculateResult()
        if(calculateResult !== null){
            this.setState({
                screenMainLine: calculateResult.toString(),
                delButton: CLR_BUTTON,
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
        }else if(label===CLR_BUTTON){
            this.flushScreen()
            this.setState({delButton: DEL_BUTTON})
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
            [this.state.delButton],
            ['÷'],
            ['⨉'],
            ['-'],
            ['+'],
        ]

        return (
            <MuiThemeProvider>
                <div className="App">
                    <Screen
                        mainLineText={this.state.screenMainLine}
                        secondLineText={this.state.screenSecondLine}
                    />
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
