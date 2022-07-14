var express = require('express');
var router = express.Router();
const db = require('../db/index')

// 作业管理

// 获取总数据条数
router.get('/attend/count', (req, res) => {
    // console.log(req.query);  // 100
    const sql = `select * from attend`
    db.query(sql, (err, result) => {
        if (err) {
            return res.send(err)
        }
        res.send({
            status: 200,
            message: '请求数据成功',
            data: result.length
        })
    })
});
// 获取指定 条数数据 和 查询 
router.get('/attend', (req, res) => {
    // 获取指定 条数数据
    // console.log(req.query);
    // console.log(req.query.limit, req.query.offset);
    if (req.query.type == 'find') {
        //  查询 符合条件的数据
        console.log(req.query);
        let condition = req.query
        // 这里注意 需要查询的参数，处了数组，应该要加双引号，不然会报错
        const sql2 = `select * from attend where name="${condition.name}"`
        db.query(sql2, (err, result) => {
            if (err) {
                return res.send(err)
            }
            console.log(result);
            res.send(
                {
                    status: 200,
                    message: '请求数据成功',
                    data: result
                }
            )
        })
    } else if (req.query.type == 'paging'){
        // console.log(req.query);  // 100
        let limit = Number(req.query.limit) // 每页的条数
        let offset = Number(req.query.offset) // 偏移量 即从哪一条数据开始 
        // 这条 SQL 语句表示 查询从 索引0 开始 
        const sql1 = 'select * from attend limit ? offset ?'
        db.query(sql1, [limit, offset], (err, result) => {
            if (err) {
                console.log(err);
                return res.send({
                    status: 500,
                    message: '数据库操作错误'
                })
            }
            // console.log(result);
            res.send(
                {
                    status: 200,
                    message: '请求数据成功',
                    data: result
                }
            )
        })
    }
});



module.exports = router;