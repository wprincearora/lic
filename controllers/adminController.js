const validate = require('validator');

var token = require('jsonwebtoken');

const _ = require('lodash');

const fs = require('fs');

var {db} = require('./../db/db.js');

const {Op}= require('./../db/db.js');

var Res = require('./../Response');

var sKey=fs.readFileSync('./private.key');




var login = (req,res,next)=>{
  var input=_.pick(req.body,['username','password']);
  if(_.isEmpty(input.username) || _.isEmpty(input.password)){
    return Res.badReq(res,{msg:'Empty Fields'});
  }
  var promise=db.Admin.generateAuth(input);
  promise.then(data=>{
    res.send(data);
  }).catch(err=>{
    console.log(err);
  })
}

var insertMode = (req,res,next) =>{
  var input = _.pick(req.body,['mode','months']);
  if(_.isEmpty(input.mode) || _.isEmpty(input.months)){
    return Res.badReq(res);
  }

  db.Modes.insert(input).then(data=>{

  }).catch(err=>{
    console.log(err);
  });

  res.send("mode inserted success");
}


module.exports={
  login,
  insertMode
};
