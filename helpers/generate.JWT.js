/* INICIO JSONWEBTOKEN */
/* 1.Crear una carpeta llamada helpers y ahi estaran los JsonWebTokens */

/* 2.Importamos el jsonwebtoken */
const jwt = require ('jsonwebtoken'); 

/* 3.Creamos un arrow function para crear el JsonWebToken */
const generateJWT =  (uid= '') =>{ 

    /* 5.Instanciamos una promesa y le damos sus respectivos parametros (Es un callback)*/ 
    return new Promise ((resolve, reject)=>{ 

        /* 7. Creamos la variable la cual va a ser igual al objeto uid */
        const payload = {uid}; 

        /* 8.Utilizamos el imporT jwt */
        jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY, {  //vamos al file .env y creamos el SECRET_OR_PRIVATE_KEY
            expiresIn : '4h' //En cuanto expira el jsonwebtoken //NOS VAMOS AL FILE (auth.controller.js)
        }, (err, token)=>{
            if (err){
                console.log(err);
                reject ('No se pudo generar el JSON WEB TOEKN')
            } else {
                resolve (token)
            }
        })
    })
}


/* 4.Exportamos el arrow function */
module.exports = {
    generateJWT
}