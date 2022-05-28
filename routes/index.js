
const authorisation = require('./authorisation')
const mainRoutes = require('./main')
module.exports = function(app){
    authorisation(app)
    mainRoutes(app)
}