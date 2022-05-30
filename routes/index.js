
const authorisation = require('./authorisation')
const mainRoutes = require('./main')
const tracksSaves =  require('./tracksSaves')
module.exports = function(app){
    authorisation(app)
    tracksSaves(app)
    mainRoutes(app)
}