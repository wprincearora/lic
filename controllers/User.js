const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      notNull:true,
       is: ["^[a-z]+$",'i'],
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      notNull:true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail:{
          args:true,
          msg:"Invalid Email",
        }
      }
    },
    token:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    verified:{
      type: DataTypes.BOOLEAN,
      allowNull:true,
    }
  },{
         timestamps: false,
        freezeTableName:true,
        tableName:'agent_info'
      });

      User.test = () => User.findOne().then((data) => {
      //console.log(data);
      return data;
    });



    User.generateAuth =  (input) =>
      User.findOne({
            attributes: ['id','name','email'],
            where:input,
          }).then((info)=>{
            if(!_.isEmpty(info)){
              var token=generateToken(info);
              User.update({token},{
                where:{id:info.id},
              }).then(data=>{}).catch(e=>{});

            return  {error:false,token,info};

            }else{
              return {error:true,msg:"Invalid Email or Password"};
            }
      }).catch(err=>{
        return {error:true,msg:'Unknown Error'};
      });

      var generateToken = (data)=>{
        return token.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 1000),
          data
        }, sKey);
      };

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return User;
};
