const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {dbConnection} = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
       
        this.port = process.env.PORT

        this.paths = {
            /* AUTHENTICATION PASO A PASO */
            /* 1.paso Auth */
            auth:       '/api/auth',

            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            //1.paso agregar path
            search:     '/api/search',
            cheeses:    '/api/cheeses',
            uploads:    '/api/uploads',
        }
        /* this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth"; */
        //Conectar a base de datos MONGODB
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routing
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Leer y parsear JSON en BODY
        this.app.use(express.json());

        //PUBLIC DIRECTORY
        this.app.use(express.static('public'));

        // Fileupload 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        /* 2.Paso Agregar Ruta (auth) */ //pasamos a crear la ruta
       this.app.use(this.paths.auth, require('../routes/auth.routes.js'));
       this.app.use(this.paths.usuarios, require('../routes/usuario.routes.js'));
       this.app.use(this.paths.categorias, require('../routes/categoria.routes.js'));
       //2.paso, agrgar routes
       this.app.use(this.paths.search, require('../routes/search.routes.js'));
       this.app.use(this.paths.cheeses, require('../routes/cheese.routes.js')); 
       this.app.use(this.paths.uploads, require('../routes/upload.routes.js'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT: ${this.port}`);
        })
    }

}

module.exports = Server;