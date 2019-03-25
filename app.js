let config = require('./config')
let express = require('express')
let app = express()

// Express Log
let morgan = require('morgan')
app.use(morgan('short'))

// 去除Express Header
app.disable('x-powered-by')

// 静态文件目录
app.use(express.static('./public'))

// Body数据解析
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

app.use(require('./router/router'))

app.listen(config.server.port, function () {
    console.log(`Start Server http://localhost:${config.server.port}/`)
})

