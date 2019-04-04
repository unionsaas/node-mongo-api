# node-mongo-api

Mongodb mql 


## Example

```
let mql = require('node-mongo-mql')(uris, options) 

let biz = {{"db":"test","c":"test","m":"find","params":[{"id":"1002"}],"limit":2,total:0}}

let rs = await (await mql)(biz)

```