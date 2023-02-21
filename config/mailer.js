const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'capytallweb@gmail.com',
      pass: 'jrqwixbabvvncwar'
    },
});

transporter.verify().then(() => {
    console.log("Listo para enviar correos")
})