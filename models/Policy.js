const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');
 // const {sequelize}= require('./../db/db');
var modes=[1,2,3,4,5];

module.exports = (sequelize, DataTypes) => {
    ////
  var Policy = sequelize.define('Policy', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customer_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    policy_number:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    branch_code:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    plan_name:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    company_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    mode:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isIn:{
          args:[modes] ,
          msg:"Invalid Mode",
        }
      }
    },
    term_duration:{
      type:DataTypes.FLOAT,
      allowNull:false,
    },
    issue_date:{
      type:DataTypes.DATEONLY,
    },
    date_of_commencement:{
      type:DataTypes.DATEONLY,
      allowNull:false,
    },
    date_of_maturity:{
      type:DataTypes.DATEONLY,
      allowNull:true,
    },
    total_installments:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    premium_amount:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    la_name:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    first_due_date:{
      type:DataTypes.DATEONLY,
      allowNull:false,
    },
    is_deleted:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:false,
    },

  },{

        freezeTableName:true,
        tableName:'tbl_policies'
      });

    //   Policy.test = () => Policy.findOne().then((d ata) => {
    //
    //   return data;
    // });



  return Policy;
};
