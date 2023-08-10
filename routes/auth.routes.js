/* 3.Importamos Router de express (auth)*/
const {Router} = require('express');

/* 4.Importamps Check de espress-validator (auth) */
const {check} = require ('express-validator');

/* 11.Importamos la funcion login del controlador */
const { login } = require('../controllers/auth.controllers.js');

/* 15.Llamamos al validateDocuments de los middlewares */
const { validateDocuments } = require('../middlewares/validate.documents.js');

/* 5.Pasamos el potencial del Router a una constante */
const router = Router();

/* 6.Metodo HTTP Post */ //pasamos a crear el controlador
router.post("/login",[ //13.Agregamos el check 
    check('email','Email is required').isEmail(), //14. 'email'= debe estar en la base de datos como llave  
    check('passoword','Password is required').not().isEmpty(),//15. 'check al password, 'password'= debe estar en la base de datos //vamos al controlador 
    validateDocuments //16.Lo llamamos para que funcione el check
], login );

/* 12.Exportamos router */
module.exports = router;

/* --------------------------------------------------- */
/* RUTA DEL POSTMAN*/

//localhost:8001/api/auth/login

/* BODY DEL POSTMAN */
/* 
{
    "email":"(uno de la base de datos)",
    "password":"(Uno de la base de datos)"

}
 */

/* RESPUESTA */

/* {
    "msg":"contacte al servicio tecnico"
} */
/* --------------------------------------------------- */

/* -------------------------------------------------- */

/* Despues del check y el validate agregado el msg debe salir*/

/* { //Si esta el email y password
    "msg":"contacte al servicio tecnico"
} */

//-------------------------------------------------------------//

//-------------------------------------------------------------//
/* { //Si hace falta el email
    "errors": [
      {
        "type": "field",
        "msg": "Email is required",
        "path": "email",
        "location": "body"
      }
    ]
  } */

//-------------------------------------------------------------//

