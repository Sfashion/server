var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    query(`select * from user where username='${username}'`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if(data.length!==0){
            if(data[0].username === username){
                if(data[0].password === password){
                    res.send({status:2,id:data[0].id});
                }else{
                    res.send("1");
                }
            }
        }else{
            res.send("0");
        }
    });
});


router.get('/userid', function(req, res) {
    let username = req.query.username;
    query(`select * from user where username='${username}'`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        let id = data[0].id;
        res.send(String(id));
    });
});

router.post('/register', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    query(`insert into user(username,password) values('${username}','${password}')`,function (err, data) {
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