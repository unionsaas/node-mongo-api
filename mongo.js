let MongoClient = require('mongodb').MongoClient

module.exports = async (uris=[], options={})=>{
    let dbs = []
    uris.forEach( async item=>{
        let mongo = await MongoClient.connect(item, options)
        dbs.push(mongo)
    })
    return async (mql)=>{
        console.log(mql)
        let p = mql.params || []
        let db = dbs[mql.db||'default'].db(mql.db||null)
        let collection = await db.collection(mql.collection)
        let rs = await collection[mql.method](...p)
        if (mql.method == 'find') {
            rs = mql.sort ? rs.sort(mql.sort) : rs
            rs = mql.skip ? rs.skip(mql.skip) : rs
            rs = mql.limit ? rs.limit(mql.limit) : rs
            rs = await rs.toArray()
        }
        console.log(rs)
    }


}