
/** 
 * During the design process care is taken to seperate interface into various layer for loose coupling. 
 * for example ./in_memory/mcq_test can be easily replace by persistance storage such as mongodb, sql
 * without any changes to other code
*/
const mcqTest = require('./in_memory/mcq_test')


function startTest(userId){
    return mcqTest.startTest(userId)                       
}

function submitAnswer(userId, questionId, answerId){
    mcqTest.submitAnswer(userId,questionId,answerId)
}

function getNextQuestion(userId){
    return mcqTest.getNextQuestion(userId)
}

function finishTest(userId){
    return mcqTest.finishTest(userId)
}



module.exports = {
    startTest: startTest,
    submitAnswer: submitAnswer,
    getNextQuestion: getNextQuestion,
    finishTest: finishTest
}