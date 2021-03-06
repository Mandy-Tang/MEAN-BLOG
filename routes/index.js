//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index');
  });

  app.get('/index', function (req, res) {
    if (app.get('env') === 'development') {
      res.render('index_dev', { title: 'MEAN-BLOG'});
    }
    else {
      res.render('index', { title: 'MEAN-BLOG'});
    }

  });

  app.get('/admin', function (req, res) {
    res.render('admin', { title: 'MEAN-BLOG Admin System'})
  });
};
