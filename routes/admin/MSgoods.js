var express = require('express');
var query = require("../../lib/pool");
var router = express.Router();
var multer = require("multer");
var fs = require('fs');
var os = require('os');

/* GET users listing. */
//展示商品
router.get('/', function(req, res) {
    query("select goods.*,category.name cname from goods inner join category where category.id = goods.cid",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
//删除商品
router.get('/del', function(req, res) {
    let id  = req.query.id;
    query(`delete from goods where id=${id}`,function (err, data) {
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
//添加商品
var upload = multer({dest:os.tmpdir()});
router.post('/thumb', upload.single('thumb'),function(req, res) {
    res.send(req.file.path);
});
router.post('/content', upload.single('content'),function(req, res) {
    res.send(req.file.path);
});
router.get("/addselect",function (req, res) {
    query("select * from category",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
router.post('/add' ,function(req, res) {
    let name = req.body.name;
    let des = req.body.des;
    let price = req.body.price;
    let weight1 = req.body.weight1;
    let weight2 = req.body.weight2;
    let isfree = req.body.isfree;
    let cid = req.body.cid;

    let thumbimg = JSON.parse( req.body.thumb );
    let thumb = [];
    thumbimg.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            thumb.push({name:val.name,url:"/api/"+imgpath});
        }else{
            thumb.push({name:val.name,url:val.url});
        }
    });
    let thumbstr = JSON.stringify(thumb);

    let conimg = JSON.parse( req.body.content );
    let content = [];
    conimg.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            content.push({name:val.name,url:"/api/"+imgpath});
        }else{
            content.push({name:val.name,url:val.url});
        }
    });
    let constr = JSON.stringify(content);

    query(`insert into goods(name,des,price,weight1,weight2,isfree,cid,thumb,content) values('${name}','${des}','${price}','${weight1}','${weight2}','${isfree}','${cid}','${thumbstr}','${constr}')`,function (err, result) {
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


//商品修改
router.get("/selectgoods",function (req, res) {
    let id = req.query.id;
    query(`select * from goods where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
    });
});
router.post('/update' ,function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let des = req.body.des;
    let price = req.body.price;
    let weight1 = req.body.weight1;
    let weight2 = req.body.weight2;
    let isfree = req.body.isfree;
    let cid = req.body.cid;

    let thumbimg = JSON.parse( req.body.thumb );
    let thumb = [];
    thumbimg.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            thumb.push({name:val.name,url:"/api/"+imgpath});
        }else{
            thumb.push({name:val.name,url:val.url});
        }
    });
    let thumbstr = JSON.stringify(thumb);

    let conimg = JSON.parse( req.body.content );
    let content = [];
    conimg.forEach(val=>{
        if (val.response){
            let imgpath = "/"+Date.now()+val.name;
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./upload'+imgpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            content.push({name:val.name,url:"/api/"+imgpath});
        }else{
            content.push({name:val.name,url:val.url});
        }
    });
    let constr = JSON.stringify(content);


    query(`update goods set name='${name}',des='${des}',price='${price}',weight1='${weight1}',weight2='${weight2}',isfree='${isfree}',cid='${cid}',thumb='${thumbstr}',content='${constr}' where id=${id}`,function (err, result) {

        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});



module.exports = router;