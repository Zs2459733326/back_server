var express = require('express');
var router = express.Router();
const db = require('../db/index')


// 信息列表管理

// 获取总数据条数
router.get('/infoss/count', (req, res) => {
    // console.log(req.query);  // 100
    const sql = `select * from infoss`
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
router.get('/infoss', (req, res) => {
    // 获取指定 条数数据
    // console.log(req.query);
    // console.log(req.query.limit, req.query.offset);
    if (req.query.type == 'find') {
        //  查询 符合条件的数据
        // console.log(req.query);
        let condition = req.query
        // 这里注意 需要查询的参数，处了数组，应该要加双引号，不然会报错
        const sql2 = `select * from infoss where name="${condition.name}" and IdCard="${condition.IdCard}"`
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
        console.log(req.query); 
        let limit = Number(req.query.limit) // 每页的条数
        let offset = Number(req.query.offset) // 偏移量 即从哪一条数据开始 
        // 这条 SQL 语句表示 查询从 索引0 开始 
        const sql1 = 'select * from infoss limit ? offset ?'
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

// 添加 数据
router.post('/infoss', (req, res) => {
    console.log(req.body);
    let body = req.body
    // const sql = `insert into students (${keys}) values (${values}) `
    const sql = 'insert into infoss set ? '
    // const sql = `insert into students set ${body}`  // 不要直接使用 模板字符串的形式 ，这样会报错
    db.query(sql, body, (err, result) => {
      if (err) {
        return res.send({
            status: 500,
            message: err
        })
      }
      res.send({
        status: 200,
        message: '添加数据成功',
      })
    })
  });

// 删除数据
router.delete('/infoss/:id', (req, res) => {
    let condition = req.params.id
    console.log(condition);
    const sql = `delete from infoss where id=${condition}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.send(err)
      }
      // console.log(result);
      res.send(
        {
          status: 200,
          message: '删除数据成功',
        }
      )
    })
});
// 修改数据
router.patch('/infoss/:id', (req, res) => {
    let condition = req.params.id
    let form =  req.body
    console.log(form);
    console.log(condition);
    const sql = 'update infoss set ? where id=?'
    db.query(sql, [form, condition], (err, result) => {
      if (err) {
        return res.send(err)
      }
      // console.log(result);
      res.send(
        {
          status: 200,
          message: '删除数据成功',
        }
      )
    })
  });
module.exports = router;