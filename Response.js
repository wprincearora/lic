const _= require('lodash');

var badReq = (res,data={})=>{
  data.error=true;
  if(!data.msg){
    data.msg="Invalid Request";
  }
  if(data.validationError){
    data.errors=errorParser(data.errors);
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

var success = (res,data={},authinfo=true)=>{
  data.error=false;
  if(!data.msg){
    data.msg="Success";
  }
  if(authinfo){
  data.AuthorizedInfo=res.basicInfo;
}
  res.send(data);;
}

var e400 = (res,data={})=>{
  data.error=true;
  if(!data.msg){
    data.msg="Unexpected Error";
  }
  res.status(417).send(data);
}
var errorParser = (arr)=>{
  var errors=[];
  for(var i=0; i<arr.length;i++){
    var obj=arr[i];
    errors.push(obj.message);
  }
  return errors;
}
module.exports={badReq,notAuth,success,e400,errorParser};
