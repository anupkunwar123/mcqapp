
const MCQList = require('./MCQList')
const GIVEN_TIME_SECOND = 30 * 60

const repo = []


function startTest(userId){
    if(statusChecker(userId, repo) === undefined){
        repo.push({
            startTime: new Date(),
            userId: userId,
            questionList: mapper(MCQList)
        })
    }
    return getNextQuestion(userId)
}

function submitAnswer(userId, questionId, answerId){
    //check if time is more than 30 minutes
    //donot accept the answer after that
    if(answerId === undefined){
        throw "Answer must be provided"
    }
    //find the test of user first
    const userTest = findUserTest(userId)
    if(userTest === undefined){
        throw ("Test has not yet started for you my friend")
    }
    if(!withInTime(userTest.startTime, new Date())){
        throw("Times up my friend")
    }

    const mcQuestion = userTest.questionList.find( (q) => {
        return q.id == questionId
    })
    if(mcQuestion === undefined){
        throw "Invalid Question"
    }
    if(mcQuestion.submittedAnswerIndex !== undefined){
        throw ("You have already submitted this answer")
    }
    mcQuestion.submittedAnswerIndex = answerId
}


function getNextQuestion(userId){
    const userTest = findUserTest(userId)
    if(userTest === undefined){
        throw "Test has not yet started for you my friend"
    }

    // if(!withInTime(userTest.startTime, new Date())){
    //     throw("Times up my friend")
    // }

    //find next question now

    var nextQuestion
    for( var i=0 ; i < userTest.questionList.length; i++){
        nextQuestion = userTest.questionList[i]
        if(nextQuestion.submittedAnswerIndex === undefined){
            break;
        }else{
            nextQuestion = null
        }
    }
    if(nextQuestion != null){
        nextQuestion.testStartTime = userTest.startTime
    }
    return nextQuestion
}

function finishTest(userId){
    //for test to finish
    //either user needs to answer all question
    //or the test allocation time has been expired
    const userTest = findUserTest(userId)
    if(userTest === undefined){
        throw ("You haven't started test")
    }
    const nextQuestion = getNextQuestion(userId)
    if(nextQuestion !== null && withInTime(userTest.startTime, new Date())){
        throw "You haven't finish the test yet"
    }

    //check time here
    const userMCQQuestionAnswer = userTest.questionList
    userMCQQuestionAnswer.map( (element) => {
        const mcqQuestion = MCQList[element.id-1]
        element.answerIndex = mcqQuestion.answerIndex
    })
    return userTest

}



function mapper(questionList){
    return questionList.map((mcQuestion) => {
        return {
            id: mcQuestion.id,
            question: mcQuestion.question,
            choiceList : mcQuestion.choiceList.slice(),
        }
    })
}

function findUserTest(userId){
    return repo.find((test) => {
        return test.userId === userId
    })
}

function statusChecker(userId, repo){
    if(userId === undefined || userId === null){
        throw "User id is required"
    }
    const userRepo = repo.find( (test) => {
        return test.userId === userId
    })
    return userRepo
    
}

function withInTime(testStartDate, currentDate, givenTimeInSec = GIVEN_TIME_SECOND){
    const timeDiffInSec = (currentDate - testStartDate) / 1000
    if(timeDiffInSec < givenTimeInSec){
        return true
    }
    return false
}



module.exports = {
    startTest: startTest,
    submitAnswer: submitAnswer,
    getNextQuestion: getNextQuestion,
    finishTest: finishTest
}