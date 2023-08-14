const {Router} = require('express');
const {check} = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { isValidRole, emailExiste, userExistsById } = require('../helpers/db.validators.js');
const { getUsers, 
        postUsers, 
        deleteUsers, 
        putUsers, 
        patchUsers} = require('../controllers/usuario.controllers.js');


        
const router = Router();

router.get("/", getUsers);
router.post("/",[
        check('nombre', 'Nombre no es valido').not().isEmpty(),
        check('password', 'Password debe ser de minimo 6 letras').isLength({min :6}),
        check('email', 'El email no es valido').isEmail(),
        /* 9. midlleware  y express validator si emailExiste */ // viene de file:[db.validator.js] carpeta:[helpers]
        check('email').custom(emailExiste ),
        /*8. Invocamos funcion validar de rol (se encuentra en helpers el isValidRole) */ //vamos al file:[db.validator.js] carpeta:[helpers]
        check('rol').custom(isValidRole),
        validateDocuments
] ,postUsers);
router.delete("/:id", [
        validateJWT,
        isAdminRole,   
        check('id', 'No es un ID válido').isMongoId(),
        /* 10. userExistsById lo llamamos de */ //file:[db.validator:js] carpeta:[helpers]
        check('id').custom( userExistsById ),
        validateDocuments
], deleteUsers );

/* 6. agregamos el id */ //venimos de el file:[usuario.controllers.js]
router.put("/:id",
[
        /* 7. Agregamos los middlewares - express validator */  //vamos al post, se encuentra el 8.paso
        check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
        check('id').custom( userExistsById ),
        check('rol').custom(isValidRole),
        validateDocuments
    ], putUsers );
router.patch("/", patchUsers);

module.exports = router;