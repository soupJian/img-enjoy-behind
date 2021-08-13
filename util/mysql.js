const mysql = require('mysql')

const  options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'imgenjoy',
  charset: 'UTF8MB4_GENERAL_CI'
}
// 创建与数据库的连接对象
var connection = mysql.createConnection(options)
// 建立连接
// connection.connect((err)=>{
//   // 如果建立失败
//   if(err){
//     console.log(err);
//   }else{
//     console.log("连接数据库成功");
//   }
// })
// 断开链接
// connection.end()

const mysqlRequest = (sql) =>{
  return new Promise((resolve,reject)=>{
    // console.log(sql)
    connection.query(sql,(err,result)=>{
      if(err){
        reject(err)
        console.log("查询异常");
      }else{
        resolve(result)
        connection.release()
      }
    })
  })
}
exports.connection = connection
exports.mysqlRequest = mysqlRequest