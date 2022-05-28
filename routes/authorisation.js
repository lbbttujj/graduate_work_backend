const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
module.exports = function(app){

    app.post('/registration',[
        check('username','Имя пользователя не может быть пустым').notEmpty(),
        check('password','Пароль должен быть больше 6 символов').isLength({min:6,max:100})
    ],controller.registration)

    app.post('/login',controller.login)

    app.get('/users',authMiddleware, controller.getUsers)
    
    app.get('/username',controller.getUserName)
}   