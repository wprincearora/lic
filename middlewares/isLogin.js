var token = require('jsonwebtoken');

const _ = require('lodash');

const fs = require('fs');

var Res = require('./../Response');

var sKey=fs.readFileSync('./private.key');

module.exports=(req,res,next) =>{
    token.verify(req.headers.token,sKey,(err,data)=>{
      if(data){
        // console.log("Token Verified");
        req.body._id=data.data.id;
        req.body._name=data.data.name;
        res.basicInfo={name:data.data.name};
        next();
      }else{
        // console.log("Not authorized");
        Res.notAuth(res,{tokenProvided:!_.isEmpty(req.headers.token)});
      }
    });
  }
