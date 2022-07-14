const db = require('../db/index')

// jwt 表准验证
const jwt = require('jsonwebtoken')
// jwt token加密规则
const secret = 'zs_js'

const isAdmin = async (req, res, next) => {
    // 1.获取token
    // jwt
    const token = req.headers.authorization.split(' ').pop() // 将字符串以空格分隔为数组，删掉数组的最后一项，并返回删除的这一项
    // console.log( jwt.verify(token, secret));
    const { id } = jwt.verify(token, secret)  // 将 token 进行解析，然后将 id 解构出来
    const {username} = jwt.verify(token, secret)
    // console.log(id, username);
    // 2.查询用户是否存在
    const sql = 'select * from users where id=?'
    db.query(sql, id, (err, results) => {
        if (err) return res.send({
            status: 500,
            message: '数据库操作错误'
        })
        if (results.length == 0) {
            res.send({
                status: 202,
                message: '用户不存在'
            })
        }
        else if (results.length === 1) {
            if (username === results[0].username) {
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

module.exports = isAdmin