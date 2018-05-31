var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    query("select * from admin",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
//修改
router.post('/upd', function(req, res) {

    let pass=req.body.pass;
    query(`update admin set password='${pass}' where username='admin'`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if(data.affectedRows===1){
            res.send("1")
        }else {
            res.send("0");
        }


    });
});

module.exports = router;