module.exports = (config) => {
    //https://www.npmjs.com/package/koa
    const Koa = require('koa')
    const app = new Koa()

    //https://www.npmjs.com/package/koa-router
    const Router = require('koa-router')
    const router = new Router()

    // https://www.npmjs.com/package/koa-static
    app.use(require('koa-static')(config.server.public, {}))

    app.use(async (ctx, next) => {
        const start = Date.now()
        await next()
        const ms = Date.now() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })

    /**
     * appid=123456&biz={"collection":"test","method":"find","params":[{"id":"1002"}],"limit":2}
     */
    router.post('/', async ctx => {
        //let appid = ctx.request.body.appid
        let biz = ctx.request.body.biz
        biz = JSON.parse(biz)
        console.log(biz)
        let p = biz.params || []
        let db = global.mongo.db()
        let collection = await db.collection(biz.collection)
        let rs = await collection[biz.method](...p)
        if (biz.method == 'find') {
            rs = biz.sort ? rs.sort(biz.sort) : rs
            rs = biz.skip ? rs.skip(biz.skip) : rs
            rs = biz.limit ? rs.limit(biz.limit) : rs
            rs = await rs.toArray()
        }
        console.log(rs)
        ctx.response.body = rs
    })

    app.use(router.routes()).use(router.allowedMethods())
    app.listen(config.server.port)
    console.log('listening on port ', config.server.port)
}
