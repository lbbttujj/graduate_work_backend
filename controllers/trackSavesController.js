const User = require('../models/User')
const Tracks = require('../models/Tracks')
const jwt = require("jsonwebtoken")




class TrackSavesController{
    async saveTracks(req,res){
        const {name,content,username} = req.body
        try {
            const track = new Tracks({name:name,content:content})
            const user = await User.findOne({username:username})
            await User.findByIdAndUpdate(user.id, {$push:{tracks:[track.name]}})
       
            await track.save()
            await user.save()
            
            return res.json({message:'Success add Track'})

        } catch (error) {
            res.status(400).json({message:'error'})

        }
    }

    async getTracks(req,res){
        try {
            const token = req.headers.authorisation.split(' ')[1]
            const decodedData = jwt.verify(token,process.env.secret)
            const user = await User.findOne({_id:decodedData.id})
            res.json(user.tracks)
            // res.json('success')
        } catch (error) {
            res.json('Пользователь не найден1')

        }
    }

    async getCurrentTrack(req,res){
        try {
            const nameTrack = req.headers.nametrack
            console.log(nameTrack)
            const currentTrack = await Tracks.findOne({name:nameTrack})
            res.json(currentTrack.content)
        } catch (error) {
            res.json({message:'Ошибка выбора трека'})
        }
    }
}


module.exports = new TrackSavesController()