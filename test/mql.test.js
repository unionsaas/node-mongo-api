let conf = {
    uris: {
        unionlive: ''
    },
    options: {useNewUrlParser: true}
}
let mql = require('../dist/index').now(conf.uris, conf.options)

mql.exec({db:'unionlive',c:'test',m:'find',params:[{}]}).then(rs=>{console.log(rs)}).catch(e=>{console.error(e)})
