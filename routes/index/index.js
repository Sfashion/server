var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    query(`select * from category`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

router.get('/banner', function(req, res) {
    query(`select * from banner`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});


module.exports = router;