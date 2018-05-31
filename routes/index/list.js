var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    query(`select * from goods`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
router.get('/cate', function(req, res, next) {
    let len = req.query.len;
    query(`select * from category limit ${len},3`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

router.get('/listofid', function(req, res) {
    let id = req.query.id;
    query(`select * from (select goods.*,category.name cname from goods inner join category where category.id=goods.cid) as tmp where cid=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});




module.exports = router;