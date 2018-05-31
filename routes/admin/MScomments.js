var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();





//获取* GET users listing. *
router.get('/', function(req, res, next) {

    query("select comments.*,goods.name shopname from comments inner join goods where comments.shopid=goods.id",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

//删除
router.get('/del', function(req, res, next) {
    let id=req.query.id;
    query(`delete from comments where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if(data.affectedRows==1){
            res.send("1")
        }else {
            res.send("0");
        }


    });
});


module.exports = router;