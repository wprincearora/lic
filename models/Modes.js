const _ = require('lodash')
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {
  var Modes = sequelize.define('Modes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mode:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    months:{
      type:DataTypes.INTEGER,
      allowNull:true,
    }
  },{
         timestamps: false,
        freezeTableName:true,
        tableName:'mode'
      });





  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Modes;
};
