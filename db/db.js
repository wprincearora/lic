const fs = require('fs');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('lic', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  logging:false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});
// var modes=[];
// sequelize.query('select id from mode').then(d=>{
//   // console.log(d[0][0].id);
//   for(var i=0; i<d[0].length;i++){
//     modes.push(d[0][i].id);
//     console.log(d[0][i].id);
//   }
//   sequelize._modes=modes;
//   console.log(sequelize._modes);
// }).catch(e=>{});

connectionCheck = (req,res,next)=>{
  sequelize.authenticate().then(()=>{
  next();
  },(err)=>{
    res.status(412).send({error:true,msg:'Error connecting database'});
    console.log('Error connecting database');
  });
}

sequelize.import('./../models/Customers.js');

sequelize.import('./../models/User.js');

sequelize.import('./../models/Policy.js');

sequelize.import('./../models/installments.js');

sequelize.import('./../models/Modes.js');

var db=sequelize.models;

   module.exports={
     db,
     connectionCheck,
     sequelize,
   };
