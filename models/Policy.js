const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {
  var Policy = sequelize.define('Policy', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    agent_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    customer_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    policy_number:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    branch_code:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    company:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    mode:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    installment_number:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    due_date:DataTypes.DATEONLY,
    start_date:DataTypes.DATEONLY,
    end_date:DataTypes.DATEONLY,
    plan:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    total_amount:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    premium_pay_status:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },
    active_status:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
    }


  },{
         timestamps: false,
        freezeTableName:true,
        tableName:'customer_policy_info'
      });

    //   Policy.test = () => Policy.findOne().then((d ata) => {
    //
    //   return data;
    // });

      

  return Policy;
};
