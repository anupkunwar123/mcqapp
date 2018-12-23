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