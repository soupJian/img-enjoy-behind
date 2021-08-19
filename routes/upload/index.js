var express = require('express');
var router = express.Router();
var multer=require('multer');
var fs=require('fs');
const {mysqlRequest} = require('../../util/mysql')
const {successCode,defaultDescription,admin} = require('../../util/type')

const upload = multer({dest: './public/upload'})

/* GET users listing. */
router.post('/', upload.array('file',9),async function(req, res, next) {
  const {files} = req
  const id = req.headers.id
  const address = []
  const time = Date.now()
  let count = 0
  files.forEach(item => {
    const index= item.originalname.lastIndexOf(".");
    //获取后缀 判断文件格式
    const ext = item.originalname.substr(index);
    const oldpath = item.destination + '/' + item.filename
    const newPath = `${item.destination}/${item.filename}${ext}`
    fs.rename(oldpath,newPath,()=>{})
    const uploadAddress = `http://175.24.116.96:3300/upload/${item.filename}${ext}`
    address.push(uploadAddress)
    let sql
    if(id === 'null'){
      sql = `insert into upload values (${admin.id},${time},'${uploadAddress}','${defaultDescription}',0,0)`
    }else{
      sql = `insert into upload values (${id},${time},'${uploadAddress}','${defaultDescription}',0,0)`
    }
    mysqlRequest(sql).then(()=>{
      count++
      if(count === files.length){
        res.send({
          code: successCode,
          message: '上传成功',
          address
        })
      }
    })
  });
});

module.exports = router;