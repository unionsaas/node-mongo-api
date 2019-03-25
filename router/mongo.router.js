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
    let p = biz.params

    let db = global.mongo.db()
    let collection = await db.collection(c)
    let rs
    if (!p || p.length == 0) {
        rs = await collection[m]()
    } else if (p[0]) {
        rs = await collection[m](p[0])
    } else if (p[1]) {
        rs = await collection[m](p[0], p[1])
    } else if (p[2]) {
        rs = await collection[m](p[0], p[1], p[2])
    } else if (p[3]) {
        rs = await collection[m](p[0], p[1], p[2], p[3])
    }
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
