var express = require('express');
var query = require("../../lib/pool");
var svgCaptcha = require('svg-captcha');
var router = express.Router();

/* GET users listing. */

router.get("/captcha",function (req, res) {
    let captcha = svgCaptcha.create({
        "size":4,
        "color":true,
        "noise":3,
        "ignoreChars": '0o1i'
    });
    req.session.code = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});
router.post('/', function(req, res) {
    let user=req.body.user;
    let pass=req.body.pass;
    let code=req.body.code;
    if (code.toUpperCase() !== req.session.code.toUpperCase()) {
        res.send("code");
        return;
    }
    query(`select * from admin where username="${user}"`,function (err,data) {
        if(err){
            throw err
            return;
        }
        if(data.length!==0){
            if(data[0].username == user){
                if(data[0].password == pass){
                    res.send("2");
                }else{
                    res.send("1");
                }
            }
        }else{
            res.send("0");
        }
    })
});
module.exports = router;