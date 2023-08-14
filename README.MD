EL AUTHENTICATION EMPIEZA EL PASO A PASO [FILE:server.js] [CARPETA:models] //FUNCIONAL

PROTEGER RUTAS CON JWT (VALIDACIONES Y RELACIONES) PASO A PASO [FILE:usuario.controllers] [CARPETA:controllers]

----------------------------------------------------------------------------------
EL JWT EMPIEZA EL PASO A PASO [FILE:generate.JWT.js] [CARPETA:helpers] //FUNCIONAL
----------------------------------------------------------------------------------

AUTHENTICATION

localhost:8004/api/auth/login

<!-- BODY -->

------------------------------------------------------
---Para que le salga el JWT debe en el body poner:----
------------------------------------------------------

"email":(el email de un documento que la contraseña este incriptada)
"password":(La contraseña que debe estar incriptada en el documento)

EJEMPLO:

{
    "email":"cardenas@gmail.com",
    "password":"123456"
}

EN EL RESPONSE DEBE SALIR ESTO:


{
  "usuario": {
    "googleSignIn": true,
    "_id": "64b6754ecc789d7449c8cf19",
    "nombre": "CARDENAS",
    "email": "cardenas@gmail.com",
    "password": "$2a$10$juSWglyy5GOmokY32zroMerRM.gYWponyCPtAV0QKu.jQ/r/VBtIe",
    "rol": "ADMIN",
    "estado": true,
    "googleSingIn": true,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGI2NzU0ZWNjNzg5ZDc0NDljOGNmMTkiLCJpYXQiOjE2OTE3NTUyMTEsImV4cCI6MTY5MTc2OTYxMX0.JATvgdUszGBblgrSL8DzXK3GRjiNnF3xjiLvxcFCDB8"
}


PROTEGER RUTAS CON JWT - VALIDACIONES Y RELACIONES
--------------------------------------------------

EJEMPLO:

DEBE ESTAR EN [PUT]

LA RUTA PUEDE SER [localhost:8003/api/usuarios/idDelQueVamosAEditar]

EN EL BODY DEBE TENER:

DEBE ESTAR IGUAL EN LA BASE DE DATOS- EXCEPTO 
---------------------------------------------
*el password debe cambiarse con la contraseña original (123456) (12345) 
*dejamos el googleSingIn quieto

#validaciones del db.validators.js

*el rol lo dejamos quieto --- (si cambiamos el rol a otra cosa debe salir el error) // El rol ${rol} no esta registrado en la base de datos
*si el ID esta mal --- (debe salir este error) // El id (usuario) no existe ${ id }
*si ponemos el Email igual, osea no lo modificamos --- (debe salir este error) // El email: ${ email }, ya está registrado
*y el nombre,email lo modificamos para que nos deje hacer la actualizacion 


"nombre",
"email",
"password",
"rol",
"googleSingIn"