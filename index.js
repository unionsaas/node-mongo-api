let moment = require('moment')

let MongoClient = require('mongodb').MongoClient

/**
 *
 * @param uris   K-V,K=dbName V=url
 * @param options
 * @returns {Promise<Function>}
 */
module.exports = async (uris={}, options={})=>{
    let dbs = { }
    for(let k in uris){
        let mongo = await MongoClient.connect(uris[k], options)
        dbs[k] = (mongo)
    }
    return async (mql)=>{
        mql = typeof(mql)=='string'?JSON.parse(mql):mql
        let p = mql.params || []
        let db = dbs[mql.db||'default'].db()
        let collection = await db.collection(mql.c)
        if(mql.m == 'insertOne'){
            p[0]._createdAt = moment().format('YYYYMMDDHHmmSS')
        }
        if(mql.m == 'updateOne'){
            p[1]._updatedAt = moment().format('YYYYMMDDHHmmSS')
        }
        let rs = await collection[mql.m](...p)
        if (mql.m == 'find') {
            rs = mql.sort ? rs.sort(mql.sort) : rs
            rs = mql.skip ? rs.skip(mql.skip) : rs
            rs = mql.limit ? rs.limit(mql.limit) : rs
            rs = await rs.toArray()
            rs = mql.total?{total:(await collection.countDocuments(...p)),data:rs}:rs
        }
        return rs
    }
}