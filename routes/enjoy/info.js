var express = require('express');
var router = express.Router();
const {mysqlRequest} = require('../../util/mysql')
const {successCode,errorCode} = require('../../util/type')

router.get('/', async function(req, res, next) {
  let sql
  sql = `select count(*) from upload`
  const data = await mysqlRequest(sql)
  sql = `update access set total=total+1`
  await mysqlRequest(sql)
  sql = `select total from access `
  const reslt = await mysqlRequest(sql)
  res.send({
    code: successCode,
    totalAccess: reslt[0].total,
    totalImg: data[0]['count(*)']
  })
});

module.exports = router;
