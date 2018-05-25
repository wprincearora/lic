var token = require('jsonwebtoken');

const _ = require('lodash');

const fs = require('fs');

var Res = require('./../Response');

var sKey=fs.readFileSync('./private.key');

module.exports=(req,res,next) =>{
    token.verify(req.headers.token,sKey,(err,data)=>{
      if(err){
        Res.notAuth(res,{tokenProvided:!_.isEmpty(req.headers.token)});
      }

      if(!_.isEmpty(data.data.name)){
        // console.log("Token Verified");
        req.body._id=data.data.id;
        req.body._name=data.data.name;
        // res.basicInfo={name:data.data.name};
      return  next();
      }else{
        // console.log("Not authorized");
        Res.notAuth(res,{tokenProvided:!_.isEmpty(req.headers.token)});
      }
    });
  }
