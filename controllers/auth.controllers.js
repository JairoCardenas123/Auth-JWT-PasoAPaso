/* 7.Importamos response de express */
const {response} = require('express');

/* 8.Creamos la funcioon login  */
const login = async (req, res=response)=>{ //agregamos el res=response
        const {email,password} = req.body; //17. destructuramos
        try {

            
            
            res.json({
                msg:"contacte al servicio tecnico"
            })
        } catch (error) {
            console.log(error);
            return res.json({  //18. hacemos el error
                msg:"Datos insuficientes    "
            })
        }
        /* 9.agregamos el formato json */
        
    }

/* 10.exportamos el login */ //regresamos a la ruta auth
module.exports = {
    login
}