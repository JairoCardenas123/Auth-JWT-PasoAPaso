const Usuario = require('../models/Usuario.js');
const bcryptjs = require ('bcryptjs');

// 17. getUsers
const getUsers = async(req, res)=>{
    const { hasta, desde } = req.query;
    const query = { estado: true };

//const usuarios = await Usuario.find(query)
//   .skip(Number( desde ))
//   .limit(Number( hasta ))

//const total = await Usuario.countDocuments(query)

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( hasta ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const postUsers = async (req, res)=>{

    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario({nombre, email, password, rol});

   
     
    // Encriptar nuestra contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // Guardar en MONGODB
    await usuario.save();
    res.json({
        "message":"post api",
        usuario
    })
}

const deleteUsers = async (req, res)=>{
    //19.  extraigo y respondo id pasado como parametro desde postman
    const {id} = req.params

    //20. borrado fisico en DB
   /*  const usuario = await Usuario.findByIdAndDelete(id); */

    //21.  borrado virtual.  solo se cambia el estado a false del usuario asociado al id en cuestion
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario)
}

const putUsers = async (req, res)=>{
    /* JWT VALIDACIONES PASO A PASO */
    /* 1.destructuramos de los parametros de la request el id */
    const { id } = req.params;
   /* 2.Extraigo lo que no necesito que se registre en MONGODB */
    const { _id, password, googleSignIn, ...resto } = req.body;

    /* 3. Encriptar la contraseña */
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new:true});

    res.json({
        msg:"Usuario Actualizado",
        usuario : usuario
    });
}

const patchUsers = (req, res)=>{
    res.json({
        "message":"patch api"
    })
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers,
    patchUsers
}