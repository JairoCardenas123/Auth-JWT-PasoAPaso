/* 9. llamamos al modelo Role */
const Role = require ('../models/Role.js');

/* 10. llamamos al modelo Usuario */
const Usuario = require('../models/Usuario.js');

/* 11. Definimos la funcion validador del rol y se exporta */
const isValidRole = async(rol= '')=>{ //parametro como cadena
    const existeRol = await Role.findOne({rol}); //con findOne le decimos que solo halle el rol
    if(!existeRol){ //si no lo encuentra gestionamos el error
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

/* 12. trasladamos desde usuarios.controllers funcion para verificar si el correo ya existe(duplicado) */
 const emailExiste = async( email = '' ) => { //parametro como cadena
    const existeEmail = await Usuario.findOne({email});//con findOne le decimos que solo halle el email //en el modelo debe estar como unique
    if(existeEmail){ //gestionamos el error
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
 }
//sucede lo mismo como con los demas
 const userExistsById = async( id ) => {

    const userExists = await Usuario.findById(id);
    if ( !userExists ) {
        throw new Error(`El id (usuario) no existe ${ id }`);
    }
}

module.exports = {
    /* 13. exportamos las funciones para llamarlas usuarios.routes.js */
    isValidRole,
    emailExiste,
    userExistsById
}