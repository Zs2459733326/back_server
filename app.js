
const express = require('express')
const app = express()
var cors = require('cors')

// 导入 解析form-data 类型参数 模块
var bodyParser = require('body-parser')

// 导入 验证身份token 中间件 
// const isUser = require('./token/mytoken')
const isAdmin = require('./token/token')
app.use(cors())



// 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 路由
const studentRouter = require('./routes/students')
const worksRouter = require('./routes/works')
const infosRouter = require('./routes/infos')
const attendRouter = require('./routes/attend')
const userRouter = require('./routes/user')
app.use('/api', isAdmin, studentRouter)
app.use('/api', isAdmin, worksRouter)
app.use('/api', isAdmin, infosRouter)
app.use('/api', isAdmin, attendRouter)
app.use('/user', userRouter)



app.listen(8889, function () {
  console.log('api server running at http://119.29.77.202/');
})