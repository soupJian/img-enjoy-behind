var express = require('express');
var router = express.Router();
var multer=require('multer');
var fs=require('fs');
const {mysqlRequest} = require('../../util/mysql')
const {successCode,admin} = require('../../util/type')

const upload = multer({dest: './public/upload'})

/* GET users listing. */
router.post('/', upload.array('file',9),async function(req, res, next) {
  const {files,id} = req
  const address = []
  const time = new Date()
  files.forEach(item => {
    const oldpath = item.destination + '/' + item.filename
    const newPath = `${item.destination}/${item.filename}_${item.originalname}`
    fs.rename(oldpath,newPath,()=>{})
    address.push(`http://175.24.116.96:3300/upload/${item.filename}_${item.originalname}`)
    let sql
    if(id){
      sql = `insert into upload values (${time},${id},'${address}')`
    }else{
      sql = `insert into upload values (${time},${admin.id},'${address}')`
    }
    mysqlRequest(sql)
  });
  res.send({
    code: successCode,
    message: '上传成功',
    address
  })
});

module.exports = router;