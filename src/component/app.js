import React from 'react'
import {startMCQTest, submitMCQAnswer, finishMCQTest} from '../usecase/mcq_test'
import Result from './result'
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.userId = this.props.userId
        this.testTimeInSec = 30 * 60
        this.state = {
            id: null,
            question:"",
            choiceList:[],
            state: null,
            selectedAnswer: null,
            result: null,
            testStartTime: null,
            time: null
        }
        this.onInput = this.onInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.finishTest = this.finishTest.bind(this)
        this.countDown = this.countDown.bind(this)
        this.timer = null

    }

    onSubmit(){
        if(this.state.selectedAnswer===null){
            alert("Please select answer first")
        }else{
            submitMCQAnswer(this.userId, this.state.id, this.state.selectedAnswer)
            .then((response) => {
                return response.json()
            }).then((data)=>{
                this.setQuestion(data)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
    setQuestion(question) {
        if(question.showResult){
            clearInterval(this.timer)
            this.setState({state: "showresultbutton"})
        }else{
            this.setState({
                id: question.id,
                question: question.question,
                choiceList: question.choiceList,
                selectedAnswer: null,
                testStartTime: question.testStartTime
            })
            this.countDown()
        } 
    }

    countDown(){
        if(this.timer != null){
            clearInterval(this.timer)
        }
        this.timer = setInterval(()=>{
            var untilDate = new Date(this.state.testStartTime)
            untilDate.setSeconds(untilDate.getSeconds() + this.testTimeInSec)
            const timeInMillis = untilDate - new Date() 
            const inSecond = Math.floor(timeInMillis / 1000)
            if(inSecond <= 0){
                clearInterval(this.timer)
                this.setState({state: "showresultbutton"})
            }else{
                const timeLabel = this.millisToMinutesAndSeconds(timeInMillis)
                this.setState({time: timeLabel})
            }
            
        }, 1000)
    }
    componentDidMount(){
        startMCQTest(this.state.userId).then((response)=>{
            return response.json()
        }).then((data) => {
            this.setQuestion((data))
        }).catch((error)=>{
            console.log(error)
        })

    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }
    onInput(radioButton){
        this.setState({selectedAnswer:radioButton.target.value})
    }

    finishTest(){
        finishMCQTest(this.state.userId)
        .then((response) => {
            return response.json()
        }).then((data) => {
            clearInterval(this.timer)
            this.setState({
                state: "showresultsheet",
                result: data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    buildRadio(questionList){
        return questionList.map( (question, i) => {
            return(
                <div key={i}>
                 <input
                    type="radio"
                    name="question"
                    value={i}
                    id={i}
                    onChange={this.onInput}
                    checked = {this.state.selectedAnswer==i}
                /><label htmlFor={i}>{question}</label>  <br/>          
                </div>
            )
        })
    }

    render(){
        var mainBlock = null
        console.log("Current state "+ this.state.state)
        if(this.state.state == "showresultbutton"){
            mainBlock = <button onClick = {this.finishTest}>See Result</button>
        }else if (this.state.state == "showresultsheet"){
            mainBlock = <Result result = {this.state.result}/>
        }else{
            mainBlock = <div>
                <h1 className="timer">{this.state.time}</h1>
                <br/>
                <br/>
                <br/>
                <h4>{this.state.question}</h4>
                <div>{this.buildRadio(this.state.choiceList)}</div>
                <br/>
                <button onClick = {this.onSubmit} disabled={!this.state.selectedAnswer}>Submit</button>
            </div>
        }
        return(
            <div>
                {mainBlock}
            </div>
        )    
    }
}
