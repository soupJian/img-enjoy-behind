var express = require('express');
var router = express.Router();
const fs = require('fs')
const {mysqlRequest} = require('../../util/mysql')
const {successCode,errorCode} = require('../../util/type')

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const {name,password} = req.body
  let sql,result
  sql = `select password from user where name = '${name}' `
  result = await mysqlRequest(sql)
  if(result.length === 0 || result[0].password !== password){
    res.send({
      code: errorCode,
      message: "用户名或者密码错误"
    })
    return false
  }
  sql = `select id,name from user where name='${name}'`
  result = await mysqlRequest(sql)
  res.send({
    code: successCode,
    message: '登录成功',
    user: result[0]
  })
});

module.exports = router;
