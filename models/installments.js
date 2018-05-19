const _ = require('lodash')
const Sequelize = require('Sequelize');


module.exports = (sequelize, DataTypes) => {
  var Installments = sequelize.define('Installments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    policy_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    due_date:{
      type:DataTypes.DATE,
      allowNull:false,
    },
    is_paid:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:false,
    },
    paid_at:{
      type:DataTypes.DATE,
      allowNull:true,
    }
  },{
         timestamps: false,
        freezeTableName:true,
        tableName:'installment'
      });

      



  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Installments;
};
