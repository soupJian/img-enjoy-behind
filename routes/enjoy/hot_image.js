var express = require('express');
var router = express.Router();
const {mysqlRequest} = require('../../util/mysql')
const {successCode,errorCode} = require('../../util/type')

router.get('/', async function(req, res, next) {
  const sql = 'select * from upload order by num desc limit 20'
  const result = await mysqlRequest(sql)
  res.send({
    code: successCode,
    data:{
      ImageList: result,
    }
  })
});

module.exports = router;
