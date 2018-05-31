var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let id = req.query.id;
    query(`select * from (select goods.*,category.name cname from goods INNER JOIN category where goods.cid=category.id ) as tmp where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});




module.exports = router;