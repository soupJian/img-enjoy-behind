const { count } = require('console');
var express = require('express');
var router = express.Router();
const fs = require('fs')
const {mysqlRequest} = require('../../util/mysql')
const {successCode, errorCode, errorMessage} = require('../../util/type')

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const {name,password} = req.body
  const id = Date.now()
  let sql 
  // 判断用户名是否注册
  sql = `select count(name) from user where name = '${name}'`
  const result = await mysqlRequest(sql)
  if(result[0]['count(name)'] === 1){
    res.send({
      code: errorCode,
      message: "用户名已注册，请重新输入！"
    })
    return false
  }
  sql = `insert into user (id,name,password) values (${id},'${name}','${password}')`
  const userPath = `public/user/${id}` // 用户 id 文件夹
  //  2.注册时候创建用户文件夹
  fs.mkdir(userPath,(err)=>{
    if(err){
        console.log("创建文件夹错误"+err);
        res.send({
          code: errorCode,
          message: errorMessage
        })
        return false
    }
    mysqlRequest(sql)
    res.send({
      code: successCode,
      message: "注册成功"
    })
  })
});

module.exports = router;
