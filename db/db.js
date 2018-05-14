const fs = require('fs');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('lic', 'forge', '3YlEdiHhvEp6ZJ9dPjHq', {
  host: '128.199.70.36',
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


var db=sequelize.models;

   module.exports={
     db,
     connectionCheck,
   };
