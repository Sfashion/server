var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
//查询订单
router.get('/', function(req, res, next) {
    let userid = req.query.userid;

    query(`select * from (select orderes.*,orders.count,goods.name,goods.des,goods.price,goods.thumb from orderes inner join orders on orderes.id=orders.orderid inner join goods on orders.shopid=goods.id) as tmp where userid=${userid}`,function (err, result) {
        if (err) {
            throw err;
            return;
        }
        res.json(result);
    });
});


//地址
router.get('/address',function (req, res) {
    let userid = req.query.userid;

    query(`select * from (select address.*,user.nickname,user.username from address inner join user where address.userid=user.id) as tmp where userid=${userid}`,function (err, result) {
        if (err) {
            throw err;
            return;
        }
        res.json(result);
    });
});


//删除地址
router.get('/del',function (req, res) {
    let id = req.query.id;
    query(`delete from address where id=${id}`,function (err, result) {
        if (err) {
            throw err;
            return;
        }
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


//模拟支付
router.get("/upt",function (req, res) {
    let id = req.query.id;
    query(`update orderes set status=1 where id=${id}`,function (err, result) {
        if (err) {
            throw err;
            return;
        }
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


router.post('/local',function (req, res) {
    let userid = req.body.userid;
    let pro = req.body.pro;
    let city = req.body.city;
    let town = req.body.town;
    let detail = req.body.detail;
    let post = req.body.post;
    let tel = req.body.tel;
    query(`insert into address(pro,city,town,detail,tel,post,userid) values('${pro}','${city}','${town}','${detail}','${tel}','${post}','${userid}')`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if (data.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});
module.exports = router;