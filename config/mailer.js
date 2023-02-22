const nodemailer = require('nodemailer')
const ejs = require('ejs')

module.exports = {
  sendMail:async(template,argumentsTemplate,to,subject) => {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: 'capytallweb@gmail.com',
        pass: 'jrqwixbabvvncwar'
      }
    }
    const transporter = nodemailer.createTransport(config)
    ejs.renderFile(template,argumentsTemplate,function(err,data){
      if(err){
        console.log(err)
      }else{
        var mainOptions = {
          from: '"Capytall" <capytallweb@gmail.com>',
          to: to,
          subject: subject,
          html: data
        }
      }
      console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions,function(err,info){
        if(err){
          console.log(err)
        }else{
          console.log('Correo enviado: ' + info.response)
        }
      })
    })
  }

/*  ejs.renderFile(template, argumentsTemplate, function (err, data) {
      if (err){
        console.log(err);
      } else {
        var mainOptions = {
            from: '"Capytall" <capytallweb@gmail.com>',
            to: to,
            subject: subject,
            html: data
        }
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' + info.response);
          }
        });
      }
    })
  },*/
}