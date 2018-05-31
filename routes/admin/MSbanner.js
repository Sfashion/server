var express = require('express');
var router = express.Router();
var query = require("../../lib/pool");
var multer = require("multer");
var os = require("os");
var fs = require("fs");



/* GET users listing. */
//展示轮播
router.get('/', function(req, res) {
    query("select * from banner",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});

router.get('/del', function(req, res) {
    let id  = req.query.id;
    query(`delete from banner where id=${id}`,function (err, data) {
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

//添加轮播
var upload = multer({dest:os.tmpdir()});
router.post('/upload', upload.single('img'),function(req, res) {
    res.send(req.file.path);
});
router.post('/add', function(req, res) {

    let des = req.body.des;
    let ename = req.body.ename;
    let img = JSON.parse( req.body.img );
    let coverimg = [];
    img.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            // fs.renameSync(val.response,'./public'+imgpath);
            coverimg.push({name:val.name,url:"/api/"+imgpath});
        }else{
            coverimg.push({name:val.name,url:val.url});
        }
    });
    let str = JSON.stringify(coverimg);

    query(`insert into banner(des,ename,img) values('${des}','${ename}','${str}')`,function (err, result) {
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});

module.exports = router;