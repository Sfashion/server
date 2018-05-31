let mysql = require("mysql");
const option = {
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"soap"
};
let pool = mysql.createPool(option);     //创建连接池

function query(sql,callback) {
    pool.getConnection(function (err,link) {    //获取一个接口
        if (err){
            callback(err);
        }else{
            link.query(sql,function (err, res) {
                if (err){
                    callback(err);
                }else{
                    callback(null,res);
                    link.release();   //把接口还回去
                }
            });
        }
    });
}

module.exports = query;
/*query("select * from car",function (err, res) {
    console.log(res);
});*/
