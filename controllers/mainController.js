
const validate = require('validator');

var token = require('jsonwebtoken');

const _ = require('lodash');

const fs = require('fs');

var {db} = require('./../db/db.js');

var Res = require('./../Response');

var sKey=fs.readFileSync('./private.key');


var badReq = (res)=>{
  res.status(400).send({error:true,msg:"Invalid Request"});
}


var login= (req,res)=>{
  var input = _.pick(req.body,['username','password']);
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
  db.User.update({token:"Prince Aora"},{
    where:{id:3},
  }).then(data=>{}).catch(e=>{});

  // // var temp=  db.User.test();
  // // temp.then((data)=>{
  // //   res.send(data);
  // //   //console.log(data);
  // // });
  //
  // var temp =  db.User.generateAuth({username:'prince',password:'123'});
  //   temp.then(data=>{
  //     res.send(data);
  //   })
  //
  // // temp.then((data)=>{
  // //   console.log(data)
  // // }).catch(e=>{
  // //   console.log(e);
  // // };
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
  db.Customers.findAll({},{where:{agent_id:req.body._id}}).then(data=>{
    // Res.success(res,{d:data});
    res.send(data);
  });
};

module.exports={
  login,
  isLogin,
  playground,
  updatePolicyStatus,
  getCustomers,
};
