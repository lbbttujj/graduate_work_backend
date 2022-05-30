const controller = require('../controllers/trackSavesController')
module.exports = function(app){

    app.post('/saveTracks',controller.saveTracks)
    
    app.get('/getTracks',controller.getTracks)

    app.get('/currentTrack',controller.getCurrentTrack)
}   