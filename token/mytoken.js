const db = require('../db/index')

// 封装验证token的中间件
const isUser = async (req, res, next) => {
    // 1.获取token
    const token = await req.headers.authorization.split(' ')[1]
    const id = token.split('.')[0]
    const username = token.split('.')[1]
    // console.log(id, username);
    // 2.查询用户是否存在
    const sql = 'select * from users where id=?'
    db.query(sql, id, (err, results) => {
        if (err) return res.send({
            status: 500,
            message: '数据库操作错误'
        })
        if (results.length == 0 ) {
            res.send({
                status: 202,
                message: '用户不存在'
            })
        }
        else if (results.length === 1){
            if (username === results[0].username){
               next()
            }
            else {
                res.send({
                    status: 202,
                    message: '用户不存在2'
                })
            }
        }
    })
}
module.exports = isUser