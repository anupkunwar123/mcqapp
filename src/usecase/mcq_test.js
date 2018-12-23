import {startTest, submitAnswer, finishTest} from './serverimpl/mcq_test'

function startMCQTest(userId){
    return startTest()
}

function submitMCQAnswer(userId, questionId, answerId){
    return submitAnswer(questionId, answerId)
}

function finishMCQTest(userId){
    return finishTest()
}

export {startMCQTest, submitMCQAnswer, finishMCQTest}