import moment from 'moment'
import {MongoClient} from 'mongodb'

interface MongoDbConfig {
    /**
     * 数据库连接配置 Key为数据库名，value为 Mongodb连接字符串
     */
    [name: string]: string
}

interface MongoDbMql {
    db: string
    c: string
    m: string
    params: Array<any>
    sort?: Array<any>
    skip?: number
    limit?: number
    total?: boolean | number
}

/***
 * Node Mongo Mql
 */
class MongoMql {

    /**
     * 构建实例对象
     * @param uris
     * @param options
     */
    static now(uris: MongoDbConfig = {}, options: any = {}):MongoMql {
        return new MongoMql(uris, options)
    }

    /**
     * Mongodb连接，数据库名作为Key, DB连接作为Value
     */
    private dbs: any = {}

    /**
     * 加载Mongodb连接
     * @param uris
     * @param options 连接可选配置
     */
    constructor(uris: MongoDbConfig = {}, options: any = {}) {
        for (let k in uris) {
            let mongo = MongoClient.connect(uris[k], options)
            this.dbs[k] = mongo
        }
    }

    /**
     * 获取指定数据库连接
     * @param name
     * @return 返回mongodb.db()
     */
    async db(name: string = 'default'): Promise<any> {
        let conn = this.dbs[name]
        if (!conn) {
            throw new Error(`Error: Connection "${name}" configuration does not exist`)
        }
        return (await conn).db()
    }

    /**
     * 执行
     * @param mql
     */
    async exec(mql: MongoDbMql): Promise<any> {
        mql = typeof (mql) == 'string' ? JSON.parse(mql) : mql
        let p: Array<any> = mql.params || []
        let db = await this.db(mql.db)
        let collection = await db.collection(mql.c)
        if (mql.m == 'insertOne') {
            p[0]._createdAt = moment().format('YYYYMMDDHHmmSS')
        } else if (mql.m == 'updateOne') {
            p[1]._updatedAt = moment().format('YYYYMMDDHHmmSS')
        }
        let rs = await collection[mql.m](...p)
        if (mql.m == 'find') {
            rs = mql.sort ? rs.sort(mql.sort) : rs
            rs = mql.skip ? rs.skip(mql.skip) : rs
            rs = mql.limit ? rs.limit(mql.limit) : rs
            rs = await rs.toArray()
            rs = mql.total ? {total: (await collection.countDocuments(...p)), data: rs} : rs
        }
        return rs
    }
}
export = MongoMql