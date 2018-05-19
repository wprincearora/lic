const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {

  var Customer = sequelize.define('customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      notNull:true,
       validate:{
         is:{
           args: /^[a-z]+$/i,
           msg:"Invalid Name .It  must be a string",
         }
       },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull:false,
    },
    agent_id:{
      type:DataTypes.INTEGER,
      allowNull:false,

    },
    email:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isEmail:{
          args:true,
          msg:"Invalid Email"
        }

      },
    },active_status:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:true,

    },
    is_deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    },
    mobile1:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is:{
          args:/^[6-9][0-9]{9}$/,
          msg:"Invalid Mobile Number 1"
        }
      }
    },
    mobile2:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        is:{
          args:/^[6-9][0-9]{9}$/,
          msg:"Invalid Mobile Number 2"
        }
      }
    }

  },{
      //Options
      });

      Customer.test = () => User.findOne().then((data) => {
      //console.log(data);
      return data;
    });




  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Customer;
};
