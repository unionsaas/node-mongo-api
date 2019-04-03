# node-mongo-api

Mongodb http server api 

## 接口说明

Request URL：/   
Method：POST    
Content-Type: application/x-www-form-urlencoded    
参数说明：

|字段|类型|是否必填|备注说明|
|-----|-----|------|--------|
| db |string| O |数据库名称，默认使用连接数据库|
| collection |string| M | 集合名称|
| method |string| M | 操作方法|
| params |array| O |方法参数|
| sort |object| O | 排序，`find`方法有效 |
| skip |number| O |开始数量，`find`方法有效|
| limit |number| O |结束数量，`find`方法有效，使用skip与limit配合实现分页|



## 使用

> npm install node-mongo-api  --save       
> require('node-mongo-api'')({})
