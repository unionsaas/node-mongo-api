let config = require('./config');
(async (server)=> {
    let MongoClient = require('mongodb').MongoClient
    let mongo = await MongoClient.connect(config.mongo.url, {useNewUrlParser: true})
    global.mongo = mongo
    server()
})(()=> {
    let express = require('express')
    let app = express()
    let morgan = require('morgan')
    app.use(morgan('short'))
    app.disable('x-powered-by')
    app.use(express.static('./public'))
    let bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(require('./router/mongo.router'))
    app.listen(config.server.port, function () {
        console.log(`Start Server http://localhost:${config.server.port}/`)
    })
})
