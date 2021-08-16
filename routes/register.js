var express = require('express');
var router = express.Router();
const fs = require('fs')
const {mysqlRequest} = require('../util/mysql')
const {successCode} = require('../util/type')

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const {name,password} = req.body
  const id = Date.now()
  const sql = `insert into user (id,name,password) values (${id},'${name}','${password}')`
  const userPath = `public/user/${id}` // 用户 id 文件夹
  //  1.注册时候创建用户文件夹
  fs.mkdir(userPath,(err)=>{
    if(err){
        console.log("创建文件夹错误"+err);
        return false
    }
    mysqlRequest(sql)
  })
  res.send({
    code: successCode,
    message: "注册成功"
  })
});

module.exports = router;
