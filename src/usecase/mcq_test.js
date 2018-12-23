/** 
 * During the design process care is taken to seperate interface into various layer for loose coupling.
 * Here  
 * for example ./serverimpl/mcq_test can be easily replace by any other data layer
 * Also we can easily change UI like reactjs  to other framework without change any data layer
 * 
*/


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