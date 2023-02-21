const nodemailer = require('nodemailer')

module.exports = {
  sendMail:async (msj) => {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: 'capytallweb@gmail.com',
        pass: 'jrqwixbabvvncwar',
      }
    }

    const transport = nodemailer.createTransport(config)
    const info = await transport.sendMail(msj)
  }
}