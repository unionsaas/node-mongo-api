//https://www.npmjs.com/package/koa-router
const KoaRouter = require('koa-router')
const router = new KoaRouter()

/**
 * appid=123456&biz={"collection":"test","method":"find","params":[{"id":"1002"}],"limit":2}
 */
router.post('/mongo.do', async ctx => {
    //let appid = ctx.request.body.appid
    let biz = ctx.request.body.biz
    biz = JSON.parse(biz)
    console.log(biz)
    let p = biz.params || []
    let db = global.mongo.db(biz.db||null)
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

module.exports = router
