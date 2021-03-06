"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const moment_1 = __importDefault(require("moment"));
const mongodb_1 = require("mongodb");
class MongoMql {
    constructor(uris = {}, options = {}) {
        this.dbs = {};
        for (let k in uris) {
            let mongo = mongodb_1.MongoClient.connect(uris[k], options);
            this.dbs[k] = mongo;
        }
    }
    static now(uris = {}, options = {}) {
        return new MongoMql(uris, options);
    }
    async db(name = 'default') {
        let conn = this.dbs[name];
        if (!conn) {
            throw new Error(`Error: Connection "${name}" configuration does not exist`);
        }
        return (await conn).db();
    }
    async exec(mql) {
        mql = typeof (mql) == 'string' ? JSON.parse(mql) : mql;
        let p = mql.params || [];
        let db = await this.db(mql.db);
        let collection = await db.collection(mql.c);
        let YYYYMMDDHHmmss = moment_1.default().format('YYYYMMDDHHmmss');
        if (mql.m == 'insertOne') {
            p[0]._createdAt = YYYYMMDDHHmmss;
            p[0]._updatedAt = YYYYMMDDHHmmss;
        }
        else if (mql.m == 'updateOne' || mql.m == 'updateMany') {
            p[1]['$set']._updatedAt = YYYYMMDDHHmmss;
        }
        let rs = await collection[mql.m](...p);
        if (mql.m == 'find') {
            rs = mql.sort ? rs.sort(mql.sort) : rs;
            rs = mql.skip ? rs.skip(mql.skip) : rs;
            rs = mql.limit ? rs.limit(mql.limit) : rs;
            rs = await rs.toArray();
            rs = mql.total ? { total: (await collection.countDocuments(...p)), data: rs } : rs;
        }
        return rs;
    }
}
module.exports = MongoMql;
