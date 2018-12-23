const router = require('express').Router()
const fs = require('fs')
const user = require('../usecase/user')
const mcqTest = require('../usecase/mcq_test')


router.get('/', (req, res, next) => {
    if(req.cookies !== undefined && req.cookies.userId !== undefined ){
        res.redirect('/home')
    }else{
        fs.readFile('./index.html', (error, data)=>{
            if(!error){
                res.setHeader('Content-Type', "text/html")
                res.status(200).send(data)
            }else{
                next(error)
            }
        })
    }
})

router.get('/home', (req, res, next) =>{
    //here we will create user and save it in the cookies
    //we will have login page for real implementation
    if(req.cookies.userId === undefined){
        const newUser = user.createUser()
        res.cookie("userId", newUser)    
        sendMCQ(res,next)
    }else{
        sendMCQ(res,next)
    }
    
})



function sendMCQ(res, next){
    fs.readFile('./mcq.html', (error, data)=>{
        if(!error){
            res.setHeader('Content-Type', "text/html")
            res.status(200).send(data)
        }else{
            next(error)
        }
    })
}

router.get('/mcq', (req,res,next) => {
    if(user.isValidUser(req.cookies.userId) !== undefined){
        const question = mcqTest.startTest(req.cookies.userId)
        if(question == null){
            res.send({showResult: true})
        }else{
            res.send(question)
        }
    }else{
        res.clearCookie('userId')
        res.set({"error_msg": "Invalid user"})
        res.status(400)
        res.end()
    }
})

router.post('/mcq', (req,res,next) => {
    if(user.isValidUser(req.cookies.userId) !== undefined){
        mcqTest.submitAnswer(req.cookies.userId, req.body.questionId, req.body.answerId)
        const nextQuestion = mcqTest.getNextQuestion(req.cookies.userId)
        if(nextQuestion == null){
            res.send({showResult: true})
        }else{
            res.send(nextQuestion)    
        } 
    }else{
        res.clearCookie('userId')
        res.set({"error_msg": "Invalid user"})
        res.status(400)
        res.end()
    }
})

router.get('/result', (req,res,next) => {
    if(user.isValidUser(req.cookies.userId) !== undefined){
        res.send(mcqTest.finishTest(req.cookies.userId))
    }else{
        res.clearCookie('userId')
        res.set({"error_msg": "Invalid user"})
        res.status(400)
        res.end()
    }
})

router.get('/restart', (req, res, next)=> {
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router