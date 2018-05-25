var express = require('express');

var router=express.Router();

var proutes=express.Router();

var mainController = require('./../controllers/mainController.js');

var isValid = require('./../middlewares/isValid.js');

var isLogin = require('./../middlewares/isLogin');

//unauthorized routes
router.post('/login',mainController.login);

router.post('/user/forgot/password',mainController.userForgotPassword);

router.post('/user/change/password',[mainController.userVerifyOtp,mainController.userUpdatePassword]);

// router.post('/hi')
//authorized Routes

router.use(isLogin);

router.post('/user/update',mainController.updateUser);

router.get('/',[function(req,res){
  res.send("hello "+req.body._name);
}]);

/********************Routes for policies*****************************/


proutes.post('/add',[isValid.customer,mainController.addPolicy,mainController.makeInstallments]);
// proutes.post('/update/status',mainController.updatePolicyStatus);

proutes.post('/info',[isValid.policy,mainController.policyInfo]);

proutes.post('/pay',[isValid.policy,mainController.payInstallment]);

proutes.post('/get/all',[isValid.customer,mainController.fetchPolicies]);

proutes.post('/delete',[isValid.policy,mainController.deletePolicy]);

/******************************************************************/

router.use('/policy/',proutes);



router.post('/get/list',mainController.getCustomers);

router.post('/playground',mainController.playground);

router.post('/add/customer',mainController.addCustomer);

router.post('/delete/customer',[isValid.customer,mainController.deleteCustomer]);

router.post('/update/customer',[isValid.customer,mainController.updateCustomer]);

router.post('/update/customer/status',[isValid.customer,mainController.updateCustomerStatus]);


/////////
module.exports = router;
