// 数据库的配置
// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host: '119.29.77.202',
    user: 'mydb',
    password: 'mydb',
    database: 'mydb'
})

// 向外共享 db 数据库连接对象
module.exports = db