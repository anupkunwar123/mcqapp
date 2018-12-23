
function startTest(){
    return fetch('mcq')
}

function submitAnswer(questionId, answerId){
    console.log(questionId, answerId)
    return fetch('mcq',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({questionId: questionId, answerId:answerId})
    })
}

function finishTest(){
    return fetch('result')
}

export {startTest, submitAnswer, finishTest}