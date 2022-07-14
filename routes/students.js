var express = require('express');
var router = express.Router();
const db = require('../db/index')


// ---学生管理---
// 获取总数据条数
router.get('/students/count', (req, res) => {
  // console.log(req.query);  // 100
  const sql = `select * from students`
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

router.get('/students', (req, res) => {
  // 获取指定 条数数据
  if (req.query.limit) {
    // console.log(req.query);  // 100
    let limit = req.query.limit
    // 这条 SQL 语句表示 查询从 索引0 开始 
    const sql = `select * from students limit 0,${limit}`
    db.query(sql, [], (err, result) => {
      if (err) {
        return res.send(err)
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
  } else {
    //  查询 符合条件的数据
    // console.log(req.query);
    let condition = req.query
    // 这里注意 需要查询的参数，处了数组，应该要加双引号，不然会报错
    const sql = `select * from students where name="${condition.name}" and number="${condition.number}"`
    db.query(sql, (err, result) => {
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
  }


});

// 添加 数据
router.post('/students', (req, res) => {
  console.log(req.body);
  let body = req.body
  // const sql = `insert into students (${keys}) values (${values}) `
  const sql = 'insert into students set ? '
  // const sql = `insert into students set ${body}`  // 不要直接使用 模板字符串的形式 ，这样会报错
  db.query(sql, body, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send({
      status: 200,
      message: '添加数据成功',
    })
  })
});
// 删除数据
router.delete('/students/:id', (req, res) => {
    let condition = req.params.id
    console.log(condition);
    const sql = `delete from students where id=${condition}`
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
router.patch('/students/:id', (req, res) => {
  let condition = req.params.id
  let form =  req.body
  console.log(form);
  console.log(condition);
  const sql = 'update students set ? where id=?'
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
