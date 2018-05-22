
const validate = require('validator');

var token = require('jsonwebtoken');

const _ = require('lodash');

const fs = require('fs');

var {db} = require('./../db/db.js');

var Res = require('./../Response');

// const moment = require('moment');

var sKey=fs.readFileSync('./private.key');

var results_per_page;
// console.log(validate.toDate(null));

var login= (req,res)=>{
  var input = _.pick(req.body,['username','password']);
  input.verified=1;
  if(_.isEmpty(input.password) || _.isEmpty(input.username) ){
    return badReq(res);
    }
    var temp =  db.User.generateAuth(input);
      temp.then(data=>{
        res.send(data);
      })

}

var generateAuth = (data)=>{
  return token.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 1000),
    data
  }, sKey);
};

var isLogin = (req,res,next) =>{
    token.verify(req.headers.token,sKey,(err,data)=>{
      if(data){
        console.log("Token Verified");
        req.body._id=data.data.id;
        req.body._name=data.data.name;
        res.basicInfo={name:data.data.name};
        next();
      }else{
        console.log("Not authorized");
        Res.notAuth(res,{tokenProvided:!_.isEmpty(req.headers.token)});
      }
    });

}

var playground = (req,res,next) =>{
  // db.User.findAll({
  //   include:[{
  //     model:db.customer,
  //     include:[{
  //       model:db.Policy,
  //       include:[
  //         {
  //           model:db.Installments
  //         }
  //       ],
  //     }],
  //   }]
  // }).then(d=>{
  //   res.send(d);
  // })


};

var updatePolicyStatus = (req,res,next)=>{
    db.Policy.findOne({
      attributes:['id','active_status'],
      where: {id:req.body.policy_id},
    }).then(data=>{
      var active_status = data.active_status ? 0 : 1;
      // console.log(active_status);
      db.Policy.update({active_status},{
        where: {id:req.body.policy_id},
      }).then(data=>{
        Res.success(res);
      });
    }).catch(e=>{
      Res.e400(res);
      // console.log(e,"hi");
    });
}

var getCustomers = (req,res,next)=>{
  db.customer.getAll(req,res,next).then(data=>{
    Res.success(res,{data,pagination:req.pagination});
  });
};

var addCustomer= (req,res,next)=> {
  var input = _.pick(req.body,['name','dob','email','mobile1','mobile2']);
  input.agent_id=req.body._id;
  db.customer.create(input).then(success=>{
      Res.success(res,{data:success});
  }).catch(e=>{
    if(e.name=='SequelizeValidationError'){
      Res.badReq(res,{validationError:true,errors:e.errors});
    }else{
      Res.e400(res);
    }
  //  res.send(e);
  });
//  res.send("hi");
};

var addPolicy = (req,res,next)=>{
   var input = _.pick(req.body,[
     'customer_id',
     'policy_number',
     'company_id',
     'branch_code',
     'plan_name',
     'term_duration',
     'mode',
     'issue_date',
     'date_of_commencement',
     'date_of_maturity',
     'total_installments',
     'premium_amount',
     'la_name',
     'first_due_date',
   ]);
   try{
    input.first_due_date= validate.toDate(input.first_due_date);
    input.issue_date= validate.toDate(input.issue_date);
    input.date_of_commencement = validate.toDate(input.date_of_commencement);
    input.date_of_maturity= validate.toDate(input.date_of_maturity);
   }catch(e){};

 db.Policy.create(input).then((data)=>{
   req.body._data=data;
   next();
 }).catch(e=>{
   if(e.name=="SequelizeValidationError"){
     Res.badReq(res,{errors:e.errors,validationError:true});
   }
 });

};

var getPolices = ()=>{
  db.Policy.findOne().then(d=>{
    res.send(d);
  });
}

var makeInstallments=(req,res,next)=>{
  var due_date=req.body._data.first_due_date;
  var policy_id=req.body._data.id;
  var mode=req.body._data.mode;
  var total_installments=req.body._data.total_installments;
  var emis=[];
  db.Modes.findOne({where:{id:mode}}).then(d=>{
    if(d.months){
      mode=d.months;
    }else{
      total_installments=1;
      mode=0;
    }
    //
    for(var i=0; i<total_installments; i++){
      emis.push({due_date,policy_id});
      due_date=addDate(due_date,mode);
    }
      // console.log(first_due_date);

      db.Installments.bulkCreate(emis).then(data=>{
        Res.success(res,{total_installments,policy_id,installment_dates:emis});
      }).catch(e=>{
        Res.e400()
      });
    //
  }).catch(e=>{
    Res.e400(res);
  })
// res.send(emis);

};

var addDate=(date,months)=>{
  var d=new Date(date);
  d.setMonth(d.getMonth()+months+1);
  return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
}

var deleteCustomer=(req,res)=>{
  db.customer.update({is_deleted:true},{where:{id:req.body.customer_id}}).then(d=>{
    Res.success(res);
  }).catch(e=>{
    Res.e400(res);
  });
}

var updateCustomer = (req,res)=>{
  var input = _.pick(req.body,['name','dob','email','mobile1','mobile2']);
  input.agent_id=req.body._id;
  db.customer.update(input,{where:{id:req.body.customer_id}}).then(success=>{
      Res.success(res);
  }).catch(e=>{
    if(e.name=='SequelizeValidationError'){
      Res.badReq(res,{validationError:true,errors:e.errors});
    }else{
      Res.e400(res);
    }
  //  res.send(e);
  });
};

var updateCustomerStatus =(req,res)=>{
  db.customer.findOne({
    attributes:['id','active_status'],
    where: {id:req.body.customer_id},
  }).then(data=>{
    var active_status = data.active_status ? 0 : 1;
    // console.log(active_status);
    db.customer.update({active_status},{
      where: {id:req.body.customer_id},
    }).then(data=>{
      Res.success(res);
    });
  }).catch(e=>{
    Res.e400(res);
    // console.log(e,"hi");
  });
};

var policyInfo= (req,res,next)=>{
  db.Policy.findOne({
    atttributes:[],
    where:{id:req.body.policy_id,
      is_deleted:false,
    },
    include:[{
      model:db.Installments
    }],
  }).then(data=>{
    var due_date;
    data.Installments.some(installment=>{

      if(installment.is_paid==null ||  installment.is_paid==false){
        due_date=installment.due_date;
        return true;

      }
    });
    console.log(due_date);
    Res.success(res,{data});
  });
}

///////
module.exports={
  login,
  isLogin,
  playground,
  updatePolicyStatus,
  getCustomers,
  addCustomer,
  addPolicy,
  makeInstallments,
  deleteCustomer,
  updateCustomer,
  updateCustomerStatus,
  policyInfo
};
