/**
 * Node Mongodb api Server
 */

let defConf = {
    server: {
        port: 10508,
        public:'public'
    },
    mongo: {
        url: 'mongodb://unionlive:unionlive@211.152.57.29:39017/unionlive?authSource=admin&authMechanism=SCRAM-SHA-1'
        //url: 'mongodb://127.0.0.1:27017/test'
    }
}

module.exports = async (config = defConf) => {
    let MongoClient = require('mongodb').MongoClient
    let mongo = await MongoClient.connect(config.mongo.url, {useNewUrlParser: true})
    global.mongo = mongo
    require('./koa')(config)
}
