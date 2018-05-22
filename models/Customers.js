const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');
var results_per_page=5;

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

    Customer.getAll= (req,res,next) =>{
      var page=1;
      if(req.query.page){
        page=req.query.page;
      }
      var offset=results_per_page*(page-1);
      req.pagination={results_per_page,current_page:page};
     return Customer.findAll({
       
      attributes:[
        'id',
        'name',
        'email',
        'dob',
        'email',
        'mobile1',
        'mobile2',
        'active_status'
      ],where:{agent_id:req.body._id,is_deleted:false},limit:results_per_page,offset:offset});
    };



  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Customer;
};
