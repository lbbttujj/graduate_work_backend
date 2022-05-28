const express = require('express');
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT 

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())

const start = async()=>{
    try {
        await mongoose.connect(`mongodb://lbbttujj:Ilovemyself19!@cluster-shard-00-00.4y0lt.mongodb.net:27017,cluster-shard-00-01.4y0lt.mongodb.net:27017,cluster-shard-00-02.4y0lt.mongodb.net:27017/?ssl=true&replicaSet=atlas-cnfocx-shard-0&authSource=admin&retryWrites=true&w=majority`)
        app.listen(PORT,(error)=>{
            error? console.log(error) :console.log(`success ${PORT}`);;
        })
    } catch (error) {
        console.log(error)
    }
}

start()

require('./routes')(app)



