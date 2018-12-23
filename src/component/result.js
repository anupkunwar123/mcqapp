import React from 'react'

export default class Result extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result: props.result,
            numberOfCorrectAns: 0
        }
        this.numberOfCorrectAns = 0
    }

    buildResult(questionList){
        const display = []
        for(var i=0; i < questionList.length; i++){
            const q = questionList[i]
            var className = null
            if(q.submittedAnswerIndex == q.answerIndex){
                className = "correct"
                this.numberOfCorrectAns = this.numberOfCorrectAns + 1
            }else{
                className = "incorrect"
            }
            const row = <div className="mcq-container" key ={i}>
                <p>{q.question}</p>
                <p> Answer:  {q.choiceList[q.answerIndex]}</p>
                <p>Your answer: <span className = {className}>{q.choiceList[q.submittedAnswerIndex]}</span></p>
            </div>
            display.push(row)
        }
        return display
    }

    render(){
        const sheet = this.buildResult(this.state.result.questionList)
        const percent = this.numberOfCorrectAns/this.state.result.questionList.length * 100
        const percentageLabel = `You have scored 
        ${percent}%
        `
        return(
            <div className="result-container">
                <h3>{"Test Result for user " +this.state.result.userId}</h3>
                <br/>
                <br/>
                <div>{sheet}</div>
                <br/>
                <h5>{percentageLabel}</h5>
                <br/>
                <br/>
                <a href="restart">Restart</a>
            </div>
        )
    }
}