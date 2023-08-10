/* 7.Importamos response de express */
const {response} = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs')

/* 8.Creamos la funcioon login  */
const login = async (req, res=response)=>{ //agregamos el res=response
        const {email,password} = req.body; //17. destructuramos
        try {
            //18. Verificar si existe el email en la base de datos
            const emailExiste = await Usuario.findOne({email}) 
            if(!emailExiste){
                return res.status(400).json({
                    msg:"Email no existe"
                })
            }
            //19.Verificar si el usuario esta activo
            if(!emailExiste.estado){
                return res.status(400).json({
                    msg:"el Usuario no esta activo"
                })
            } 

            //20.Verificar si el password es correcto y coincide con la base de datos

            const passwordValido = bcryptjs.compareSync(password,emailExiste.password);

            if(!passwordValido){
                return res.status(400).json({
                    msg:"El password no es correcto"
                })
            }

            res.json({
                msg:"All good duuuuuude"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Error en el servidor"
            });
        }
        /* 9.agregamos el formato json */
        
    }

/* 10.exportamos el login */ //regresamos a la ruta auth
module.exports = {
    login
}