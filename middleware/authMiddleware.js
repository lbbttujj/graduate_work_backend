const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorisation.split(' ')[1]
        if(!token){
            res.status(400).json({message:'Нет токена'})
        }
        const decodedData = jwt.verify(token,process.env.secret)
        if(decodedData.roles.includes('ADMIN')){
            req.user = decodedData
            next()
        }else{
            res.status(400).json({message:'Пользователь не является администратором'})   
        }
        
    } catch (error) {
        console.log(error) 
        res.status(400).json({message:'Пользователь не авторизован'})   
    }   
}