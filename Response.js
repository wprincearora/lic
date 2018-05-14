const _= require('lodash');

var badReq = (res,data={})=>{
  data.error=true;
  if(!data.msg){
    data.msg="Invalid Request";
  }
  res.status(400).send(data);
}

var notAuth = (res,data={})=>{
  data.error=true;
  if(!data.msg){
    data.msg="Not Authorized for this route or Invalid Token";
  }
  res.status(401).send(data);;
}

var success = (res,data={})=>{
  data.error=false;
  if(!data.msg){
    data.msg="Success";
  }
  data.AuthorizedInfo=res.basicInfo;
  res.send(data);;
}

var e400 = (res,data={})=>{
  data.error=true;
  if(!data.msg){
    data.msg="Unexpected Error";
  }
  res.status(417).send(data);
}

module.exports={badReq,notAuth,success,e400};
