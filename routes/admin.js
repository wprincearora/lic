var express = require('express');
var router = express.Router();
 var admin = require('./../controllers/adminController');

 var isAdmin = require('./../middlewares/isAdmin');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',admin.login);

router.use(isAdmin);

router.post('/insert/mode',admin.insertMode);
module.exports = router;
