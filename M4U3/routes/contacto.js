var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true
  });
});

router.post('/', async (req, res, next) => {

  //console.log(req.body)
  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var ubicacion = req.body.ubicacion;
  var comentario = req.body.comentario;

  var obj = {
    to: 'mariano14031997@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + "se contacto atraves y quiere mas info a este correo: " + email + ". <br> Ademas, hizo el siguiente comentario: " + comentario + ". <br> Su tel es: " + telefono + ".<br> de la ciudad de: " + ubicacion
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('contacto', {
    isContacto: true,
    message: 'mensaje enviado correctamente'
  });

});

module.exports = router;
