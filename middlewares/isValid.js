const _ = require('lodash');
var {db}= require('./../db/db');
const Res = require('./../Response');
module.exports = (req,res,next)=>{
  
    var input=_.pick(req.body,['policy_id','_id']);
    // db.Policy.findAll();
     db.Policy.findOne({where:{
      id:input.policy_id,
      agent_id:input._id
    }}).then((success)=>{
      if(!_.isEmpty(success)){
          next();
      }else{
        Res.badReq(res);
      }
    }).catch((error)=>{
      console.log(error);
    });

}
