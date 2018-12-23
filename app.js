
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routers/index')
const PORT = 3000

const app = express()

//add body parser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//add cookie parser middleware
app.use(cookieParser())

//add static folders
app.use(express.static(path.resolve(__dirname,"assets")))

//routers
app.use('/', indexRouter)



//start server
app.listen(PORT, (error)=> {
    if(!error){
        console.log(`Server listening at port ${PORT}`)
    }
})

