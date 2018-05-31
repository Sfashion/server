var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'upload')));
app.use("/api",express.static(path.join(__dirname, 'upload')));

//session
app.use(session({
    secret:"syq",
    resave:true,
    saveUninitialized:true
}));

//后台
var login = require('./routes/admin/MSlogin');
var goods = require('./routes/admin/MSgoods');
var cate = require('./routes/admin/MScategory');
var order = require('./routes/admin/MSorder');
var comments = require('./routes/admin/MScomments');
var admin = require('./routes/admin/MSadmin');
var user = require('./routes/admin/MSuser');
var banner = require('./routes/admin/MSbanner');
app.use('/api/admin/login', login);
app.use('/api/admin/category', cate);
app.use('/api/admin/goods', goods);
app.use('/api/admin/order', order);
app.use('/api/admin/comments', comments);
app.use('/api/admin/user', user);
app.use('/api/admin/admin', admin);
app.use('/api/admin/banner', banner);

//前台
var index = require('./routes/index/index');
var list = require('./routes/index/list');
var show = require('./routes/index/show');
var car = require('./routes/index/car');
var orders = require('./routes/index/order');
var complete = require('./routes/index/complete');
var qtlogin = require('./routes/index/login');
var personal = require('./routes/index/personal');

app.use('/api/index/index',index);
app.use('/api/index/list',list);
app.use('/api/index/show',show);
app.use('/api/index/car',car);
app.use('/api/index/order',orders);
app.use('/api/index/complete',complete);
app.use('/api/index/login',qtlogin);
app.use('/api/index/personal',personal);
























// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(8000,function () {
    console.log("服务器已启动");
});
