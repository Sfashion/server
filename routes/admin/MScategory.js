var express = require('express');
var router = express.Router();
var query = require("../../lib/pool");
var multer = require("multer");
var os = require("os");
var fs = require("fs");



/* GET users listing. */
//展示栏目
router.get('/', function(req, res) {
    query("select * from category",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
//删除栏目
router.get('/del', function(req, res) {
    let id  = req.query.id;
    query(`delete from category where id=${id}`,function (err, data) {
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

//添加栏目
var upload = multer({dest:os.tmpdir()});
router.post('/upload', upload.single('coverimg'),function(req, res) {
    res.send(req.file.path);
});
router.post('/add', function(req, res) {

    let name = req.body.name;
    let ename = req.body.ename;
    let img = JSON.parse( req.body.coverimg );
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

    query(`insert into category(name,ename,coverimg) values('${name}','${ename}','${str}')`,function (err, result) {
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


//修改栏目
router.get('/updateshow', function(req, res) {
    let id  = req.query.id;
    query(`select * from category where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
router.post('/update', function(req, res) {
    let id  = req.body.id;
    let name = req.body.name;
    let ename = req.body.ename;
    let img = JSON.parse( req.body.coverimg );
    let coverimg = [];
    img.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            coverimg.push({name:val.name,url:"/api/"+imgpath});
        }else{
            coverimg.push({name:val.name,url:val.url});
        }
    });
    let str = JSON.stringify(coverimg);

    query(`update category set name='${name}',ename='${ename}',coverimg='${str}' where id=${id}`,function (err, data) {
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