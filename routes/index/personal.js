var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let id = req.query.id;
    query(`select * from user where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});


router.get('/order', function(req, res, next) {
    let id = req.query.id;
    query(`select * from (select orderes.*,orders.id oid,orders.count,goods.name,goods.des,goods.price,goods.thumb from orderes inner join orders on orderes.id=orders.orderid inner join goods on orders.shopid=goods.id) as tmp where userid=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

router.get('/delorder', function(req, res) {
    let id = req.query.id;
    query(`delete from orders where id=${id}`,function (err, result) {
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
module.exports = router;