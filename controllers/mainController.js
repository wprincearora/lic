const validate = require('validator');
var token = require('jsonwebtoken');
const _ = require('lodash');
const fs = require('fs');
var {db} = require('./../db/db.js');
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

  /*db.User.findOne({
        attributes: ['id','name','email'],
        where:input,
      }).then((data)=>{
        if(!_.isEmpty(data)){
          res.send({error:false,token:generateAuth(data)});
        }else{
          res.send({error:true,msg:"Invalid Email or Password"});
        }
  });*/
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
        console.log("Verified");
        req.body._id=data.data.id;
        req.body._name=data.data.name;
        next();
      }else{
        console.log("Not authorized");
        res.status(401).send({error:true,msg:'Not Authorized for this route or Invalid Token',tokenProvided:!_.isEmpty(req.headers.token)});
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

module.exports={login,isLogin,playground};
