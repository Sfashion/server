var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    query("select orderes.*, orders.shopid, orders.count, goods.name, user.nickname, address.pro,address.city,address.town,address.detail,address.tel,address.post from orderes inner join orders on orderes.id = orders.orderid inner join user on orderes.userid = user.id inner join address on orderes.userid = address.userid inner join goods on orders.shopid = goods.id",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

//发货
router.get('/update', function(req, res, next) {
    let id = req.query.id;
    query(`update orderes set status=2 where id=${id}`,function (err, data) {
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