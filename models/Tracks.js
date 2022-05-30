const {Schema, model} = require('mongoose')

const Tracks = new Schema({
    name:{type:String, unique:true, required:true},
    content:{type:String, required:true}
})

module.exports = model("Tracks", Tracks)