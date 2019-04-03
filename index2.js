/**
 * Node Mongodb api Server
 */
const path = require('path')

//https://www.npmjs.com/package/koa
const Koa = require('koa')
const app = new Koa()

function H(){

}

/**
 * 配置多个Mongodb数据库连接
 * @param key
 * @param mongoConnect
 */
H.prototype.mongo = (key='default', mongoConnect)=>{
    global.mongo[key] = mongoConnect
}

/**
 * Koa
 * @param asyncFun
 */
H.prototype.use = (asyncFun)=>{
    app.use(asyncFun)
}

/**
 * 添加 Koa 路由
 * @param router
 */
H.prototype.router = (router)=>{
    app.use(router.routes()).use(router.allowedMethods())
}

/**
 * 启动服务
 * @param port  定义端口
 * @param koaStatic  指定静态目录
 */
H.prototype.start = (port=10508, koaStatic)=>{
    if(!koaStatic){
        // https://www.npmjs.com/package/koa-static
        koaStatic = require('koa-static')(path.join(dirname, '../../public'), {})
    }
    app.use(koaStatic)

    let router = require('./koa-router')
    app.use(router.routes()).use(router.allowedMethods())

    app.listen(port)
    console.log('listening on port ', port)
}

/**
 * 执行Mongodb操作
 * @param mql
 */
H.prototype.mongo = async (mql)=>{
    mql = JSON.parse(mql)
    console.log(mql)
    let p = mql.params || []
    let db = global.mongo[mql.db||'default'].db(mql.db||null)
    let collection = await db.collection(mql.collection)
    let rs = await collection[biz.method](...p)
    if (mql.method == 'find') {
        rs = mql.sort ? rs.sort(mql.sort) : rs
        rs = mql.skip ? rs.skip(mql.skip) : rs
        rs = mql.limit ? rs.limit(mql.limit) : rs
        rs = await rs.toArray()
    }
    //Mongo响应结果
    console.log(rs)
}

module.exports = new H()