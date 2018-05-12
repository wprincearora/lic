const fs = require('fs');
var sKey=fs.readFileSync('./private.key');
// module.exports = function(sequelize, DataTypes){
//     return sequelize.define('agent_info', {},{
//        timestamps: false,
//       freezeTableName:true
//     })
// };


// const User = conn.define('agent_info', {
//
// },{
//    timestamps: false,
//   freezeTableName:true
// });
//
// User.findAll().then(users => {
//   console.log(users.attributes)
// })

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {},{
         timestamps: false,
        freezeTableName:true,
        tableName:'agent_info'
      });

      User.test = function(){
         User.findOne().then(data =>{

        });
      };
    // User.generateAuth = (data) =>{
    //   User.findOne({
    //     where:{
    //       id:1
    //     },
    //   }).then(users => {
    //     console.log("data",users)
    //     return users;
    //   });
    // }

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return User;
};
