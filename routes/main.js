const path = require('path');
const fs = require('fs');
const createPath = (page)=>path.resolve('./','files',`${page}.txt`)

module.exports = function(app){
    app.get('/',(req,res)=>{
    console.log('hi');
    let custompath = createPath('test')
    const file = fs.readFileSync(custompath,'utf-8')
    // res.status(200).sendFile(custompath)
    res.json(file)
    })
    app.use((req,res)=>{
        res
        .status(404)
        .end('error')
    })


    
}   