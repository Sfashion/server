var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let shopid = req.body.shopid;
    let userid = req.body.userid;
    let count = req.body.count;

    query(`insert into car(shopid,userid,count) values(${shopid},${userid},${count})`,function (err, result) {
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


router.get('/select', function(req, res, next) {
    let id = req.query.id;
    query(`select * from (select car.*, goods.name, goods.des, goods.thumb, goods.price from car inner join goods where car.shopid = goods.id) as tmp where userid = ${id}`,function (err, result) {
        if (err) {
            throw err;
            return;
        }
        res.json(result);
    });
});


router.get('/del', function(req, res) {
    let id = req.query.id;
    query(`delete from car where id=${id}`,function (err, result) {
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

router.get('/clearcar', function(req, res) {
    let userid = req.query.userid;
    query(`delete from car where userid=${userid}`,function (err, result) {
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



router.post('/addorder', function(req, res) {
    let number = req.body.number;
    let userid = req.body.userid;
    let shopidarr = req.body.shopid.split(',');
    let countarr = req.body.count.split(',');
    let orderid = '';
    query(`insert into orderes(number,userid) values(${number},${userid})`,function (err, result) {
        if (result.affectedRows===1){
            orderid = result.insertId;
            shopidarr.forEach((val,index)=>{
                query(`insert into orders(orderid,shopid,count) values(${orderid},${val},${countarr[index]})`,function (err, data) {
                    if (err) {
                        throw err;
                        return;
                    }
                    if (data.affectedRows===1){
                        query(`delete from car where shopid=${val}`,function (error) {
                            if (error) {
                                throw error;
                                return;
                            }
                        });
                    }
                });
            });
            res.send({sta:1,orderid:orderid});
        }else{
            res.send("0");
        }
    });


});
module.exports = router;