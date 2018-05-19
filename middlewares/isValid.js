const _ = require('lodash');
var {db}= require('./../db/db');
const Res = require('./../Response');
module.exports = (req,res,next)=>{
    var input=_.pick(req.body,['policy_id','_id','customer_id']);
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
    }else if(!_.isEmpty(input.policy_id)){
      console.log("hi");
    }else{
      return Res.badReq(res);
    }

    // // db.Policy.findAll();
    //  db.Policy.findOne({where:{
    //   id:input.policy_id,
    //   agent_id:input._id
    // }}).then((success)=>{
    //   if(!_.isEmpty(success)){
    //       next();
    //   }else{
    //     Res.badReq(res);
    //   }
    // }).catch((error)=>{
    //   // console.log(error);
    // });
    // next();
}
