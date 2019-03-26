let express = require('express')
let router = express.Router()


// let biz = {
//     collection:'test',
//     method:'findOne',
//     params:[]
// }

//biz={"collection":"test","method":"find","params":[{"id":"1002"}],"limit":2}
router.post('/mongo', async function (req, res) {
    //let appid = req.body.appid
    let biz = req.body.biz
    biz = JSON.parse(biz)
    console.log(biz)
    let c = biz.collection
    let m = biz.method
    let p = biz.params || []

    let db = global.mongo.db()
    let collection = await db.collection(c)
    let rs = await collection[m](...p)
    if (m == 'find') {
        rs = biz.sort ? rs.sort(biz.sort) : rs
        rs = biz.skip ? rs.skip(biz.skip) : rs
        rs = biz.limit ? rs.limit(biz.limit) : rs
        rs = await rs.toArray()
    }
    console.log(rs)
    res.header('Content-Type', 'application/json')
    res.send(rs)
    res.end()
})
module.exports = router
