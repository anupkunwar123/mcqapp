const user = require('./user')
const mcqTest = require('./mcq_test')
const firstUser = user.createUser()
console.log(mcqTest.startTest(firstUser))



