const _ = require('lodash')
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {
  var Modes = sequelize.define('Otp', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    otp:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    is_consumed:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:false
    },
    token:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    tried:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:0
    }
  },{

        freezeTableName:true,
        tableName:'tbl_otps'
      });





  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Modes;
};
