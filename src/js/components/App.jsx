/* eslint no-eval: 0 */
/* Yes i really need `eval` in this application :) */

import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/App.css'
import {ButtonSet} from './ButtonSet'
import {Screen} from './Screen'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const MAX_CHAR = 18
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
        let len = screenMainLine.length
        let newSymbolIsNumber = !isNaN(parseInt(symbol, 0))

        if(this.state.delButton === CLR_BUTTON){  /* we have result on the screen, let's clear it */
            if(newSymbolIsNumber){
                screenMainLine = ''
            }
            this.setState({
                delButton: DEL_BUTTON,
            })
        }

        if(isNaN(parseInt(screenMainLine.substring(len-1, len), 0)) && !newSymbolIsNumber){
            if(len !== 0){
                screenMainLine = screenMainLine.substring(0, len-1) + symbol
            }
        }else{
            screenMainLine = screenMainLine.concat(symbol)
        }

        if(len>=MAX_CHAR){
            return
        }

        this.setState({
            screenMainLine: screenMainLine
        }, this.tryCalculate)
    }

    removeLastScreenSymbol(){
        let len = this.state.screenMainLine.length
        if(len !== 0){
            this.setState({
                screenMainLine: this.state.screenMainLine.substring(0, len-1)
            }, this.tryCalculate)
        }
    }

    calculateResultAndShow(){
        let calculateResult = this.calculateResult()
        if(calculateResult !== null && calculateResult.toString() !== this.state.screenMainLine){
            this.setState({
                screenMainLine: calculateResult.toString(),
                screenSecondLine: '',
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
        // let numbers = filteredInput.split(new RegExp("[^0-9.]")).map((num) => (bigInt(num)))
        // let actions = filteredInput.split(new RegExp("[0-9.]+")).filter((el) => (el.length != 0))

        try{
            evalResult = eval(filteredInput)
            if(evalResult===undefined){evalResult=null}
        }catch(_){
            /* just do nothing in this case */
        }
        return evalResult
    }

    buttonPressHandler(label){
        if(label===DEL_BUTTON){
            this.removeLastScreenSymbol()
        }else if(label===CLR_BUTTON){
            this.setState({
                delButton: DEL_BUTTON,
                screenMainLine: ''
            })
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
