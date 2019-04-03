/**
 * Node Mongodb api Server
 */
const path = require('path')

//https://www.npmjs.com/package/koa
const Koa = require('koa')
const app = new Koa()


let defConf = {
    server: {
        port: 10508,
        public:'public'
    },
    mongo: {
        url: 'mongodb://unionlive:unionlive@211.152.57.29:39017/unionlive?authSource=admin&authMechanism=SCRAM-SHA-1&useNewUrlParser=true'
        //url: 'mongodb://127.0.0.1:27017/test'
    }
}

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
 *
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

module.exports = async (config = defConf) => {
    let MongoClient = require('mongodb').MongoClient
    let mongo = await MongoClient.connect(config.mongo.url, {})
    global.mongo = mongo

    // https://www.npmjs.com/package/koa-static
    app.use(require('koa-static')(config.server.public, {}))

    app.use(async (ctx, next) => {
        const start = Date.now()
        await next()
        const ms = Date.now() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })

    app.use(router.routes()).use(router.allowedMethods())
    app.listen(config.server.port)
    console.log('listening on port ', config.server.port)
}
