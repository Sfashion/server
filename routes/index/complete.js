var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let len = req.query.len;
    query(`select * from category limit ${len},3`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});


router.get('/order', function(req, res) {
    let id = req.query.id;
    query(`select * from orderes where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

module.exports = router;