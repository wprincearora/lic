var express = require('express');

var router=express.Router();

var proutes=express.Router();

var mainController = require('./../controllers/mainController.js');

var isValid = require('./../middlewares/isValid.js');

var isLogin = require('./../middlewares/isLogin');

//unauthorized routes
router.post('/login',mainController.login);

//authorized Routes
router.use(isLogin);

router.get('/',[function(req,res){
  res.send("hello "+req.body._name);
}]);

/********************Routes for policies*****************************/
proutes.use(isValid);

proutes.post('/update/status',mainController.updatePolicyStatus);



/******************************************************************/
router.use('/policy/',proutes);

router.post('/get/list',mainController.getCustomers);

router.get('/playground',mainController.playground);

/////////
module.exports = router;
