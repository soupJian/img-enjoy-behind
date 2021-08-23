var express = require('express');
var router = express.Router();
const {mysqlRequest} = require('../../util/mysql')
const {successCode,errorCode} = require('../../util/type')

router.get('/', async function(req, res, next) {
  const id = req.headers.id
  if(id === 'null'){
    res.send({
      code: successCode,
      data:{
        ImageList: []
      }
    })
    return false
  }
  const sql = `select * from upload where id = ${id}`
  const result = await mysqlRequest(sql)
  res.send({
    code: successCode,
    data:{
      ImageList: result
    }
  })
});

module.exports = router;
