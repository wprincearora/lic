const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
const _ = require('lodash')
var token = require('jsonwebtoken');
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {

  var Customers = sequelize.define('Customers', {
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
    mobile_number: {
      type: DataTypes.STRING,
      allowNull:false,
      notNull:true,
    },
    agent_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      notNull:true,
    },

  },{
         timestamps: false,
        freezeTableName:true,
        tableName:'customer_info'
      });

      Customers.test = () => User.findOne().then((data) => {
      //console.log(data);
      return data;
    });




  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Customers;
};
