var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter =  nodemailer.createTransport({
  service : 'gmail',
  auth:{
    user:'opopol.prince@gmail.com',
    pass:'99915pri'
  },
  tls: {
          rejectUnauthorized: false
      },
});



var send = (mailOptions = {
  from: 'Prince Arora',
  to: 'x@gmail.com',
  subject: 'Sending Email using Node.js',
  html: fs.readFileSync('./template.html')
})=> {


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

module.exports=send;
