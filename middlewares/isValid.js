const _ = require('lodash');
var {db}= require('./../db/db');
const Res = require('./../Response');
var customer = (req,res,next)=>{
    var input=_.pick(req.body,['_id','customer_id']);
    // db.Policy.findAll().then(data=>{
    //   res.send(data);
    // }).catch(e=>{
    //   res.send(e);
    // });
    if(!_.isEmpty(input.customer_id)){
      db.customer.findOne({where:{agent_id:input._id,id:input.customer_id}}).then(data=>{
        if(!_.isEmpty(data)){
              return next();
        }
        return Res.badReq(res,{msg:"Customer doesn't belong to you"});
      }).catch(e=>{
        Res.e400(res);
      });
    }else{
      return Res.badReq(res);
    }

};

var policy = (req,res,next)=>{
    var input=_.pick(req.body,['_id','policy_id']);
    if(!_.isEmpty(input.policy_id)){
      db.Policy.findOne({
        where:{id:input.policy_id},
        include:[{
          model:db.customer,
          include:[{
            model:db.User
          }]
        }]
      }).then(data=>{
      if(input._id==data.customer.User.id){
        next();
      }else{
          return Res.badReq(res);
      }
    }).catch(e=>{
      Res.e400(res);
    });

    }else{
      return Res.badReq(res);
    }

};


module.exports={
      policy,
      customer,
    };
