const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileUpload');
const { dbConnection } = require("../database/config");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            search: '/api/search',
            uploads: '/api/uploads',
            products: '/api/products',
            categories: '/api/categories'
        }

        // Database
        this.databaseConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async databaseConnection(){
        await dbConnection()
    }

    middlewares(){
        // Cors
        this.app.use(cors());
        // Parse
        this.app.use(express.json());
        // RequestHandler creates a separate execution context using domains, so that every
        this.app.use(Sentry.Handlers.requestHandler());
        // TracingHandler creates a trace for every incoming request
        this.app.use(Sentry.Handlers.tracingHandler());
        // Error handler
        this.app.use(Sentry.Handlers.errorHandler());
        // Public directory
        this.app.use(express.static('public'));
        // Upload Files 
        this.app.use(fileUpload({
            createParentPath: true,
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.categories, require('../routes/categories'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server start listening http://localhost:${this.port}/`);
        });
    }
}

module.exports = Server;