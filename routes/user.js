// 500 数据库错误
// 200 成功
// 201 用户已存在
// 202 用户不存在
// 203 密码错误

// **************这里是为了演示 token 的生成和解析过程，不作为功能代码
// jwt token加密规则
const secret = 'zs_js'
// jwt 表准验证
const jwt = require('jsonwebtoken')


var express = require('express');
var router = express.Router();
const db = require('../db/index')


// 注册业务
router.post('/register', (req, res) => {
     let username = req.body.username
     console.log(username);
     const sql = "select * from users where username=?"
     db.query(sql, username, (err, results) => {
        if (err) {
            return res.send({
                status:500,
                message: "操作数据库错误 " + err
            })
        }
        if (results.length > 0) {
            return res.send({
                status:201,
                message: '该用户已存在！'
            })
        }
        else if (results.length < 1) {
          const sql = 'insert into users set ?'
          db.query(sql, req.body, (err, result) => {
            if (err) {
                return res.send({
                    status:500,
                    message: '数据库操作出错！'
                })
            }
            else {
                return res.send({
                    status:200,
                    message: '注册成功！'
                })
            }
          })
        }
     })
})

// 登录业务
router.post('/login', (req, res) => {
    console.log(req.body);
    let body =  req.body
    let username = body.username
    let password = body.password
    const sql = 'select * from users where username=?'
    db.query(sql, username, (err, results) => {
       if (results.length == 0) {
           return res.send({
               status:202,
               message: '该用户不存在！'
           })
       }
       else if (results.length === 1) {
        if (password === results[0].password){
         /*    // 暂时设置 token 为 用户id 拼接上 用户名
            let token = results[0].id + '.' + results[0].username */
        // 使用 jwt标准 创建token   sign(a,b,c) a 为token中携带的数据，b 为加密规则， c 为token的有效时间
            const token = jwt.sign({id:results[0].id,username: results[0].username}, secret, {expiresIn: '24h'})
            res.send({
                status: 200,
                message: '登录成功',
                token: token
            })
        }
        else {
            res.send({
                status: 203,
                message: '密码不正确！'
            })
        }
       }
    })
})

// 验证 **************这里是为了演示 token 的生成和解析过程，不作为功能代码
router.get('/verify', (req, res) => {
    // 自己写token验证
    /* // 1.获取token
    const token = req.headers.authorization.split(' ')[1]
    const id = token.split('.')[0]
    const username = token.split('.')[1]
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
                res.send({
                    status: 200,
                    message: '用户登录成功'
                })
            }
            else {
                res.send({
                    status: 202,
                    message: '用户不存在2'
                })
            }
        }
    }) */

    // jwt
    const token = req.headers.authorization.split(' ').pop() // 将字符串以空格分隔为数组，删掉数组的最后一项，并返回删除的这一项
    // console.log( jwt.verify(token, secret));
    const {id} =  jwt.verify(token, secret)  // 将 token 进行解析，然后将 id 解构出来
    console.log(id);
})




module.exports = router;