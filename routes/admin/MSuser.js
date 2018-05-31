var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    query("select * from user",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});




module.exports = router;