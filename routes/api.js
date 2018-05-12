var express = require('express');
var mainController = require('./../controllers/mainController.js');
var router=express.Router();
//unauthorized routes
router.post('/login',mainController.login);

//authorized Routes
router.use(mainController.isLogin);

router.get('/',[function(req,res){
  res.send("hello "+req.body._name);
}]);


router.get('/playground',mainController.playground);

//
module.exports = router;
