
const users = []
//we use this to generate unqiue user id
var uniqid = require('uniqid');

function createUser(){
    const id = uniqid()
    users.push(id)
    return id
}

function isValidUser(user){
    return users.find( (u)=> {
        return u == user
    })
}

module.exports = {
    createUser: createUser,
    isValidUser: isValidUser
}

