const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

//Security npm packages
const cors = require("cors");
const cookieParser = require('cookie-parser')

//This are npm packages for all form type uploads  ---formdata, jsondata e.t.c
const bodyParser = require("body-parser");
const multer = require('multer');
const forms = multer();

//API Documentaion with @swagger
const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")

//Routes importations
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const transactionsRoute = require('./routes/transactions');

//DATABASE importations
const connectedDatabase = require('./config/db')

//Server listening port
const PORT = process.env.PORT || 3000


//----- middelwares---//
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

//--- All Routes ---//
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/transactions', transactionsRoute)

//--- Swagger Api Docs Options ---//
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Skye Wallet API Library',
            version: '1.0.0',
            description: "API library documentaion for Skye Wallet"
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],

        servers: [ { 
            url: process.env.SWAGGERBASEURL
        }]
    },

    apis: ["./routes/*.js"]
}

var option = {
    customCssUrl: '/custom.css'
};

const swagger = swaggerDoc(options)


app.use("/", swaggerUi.serve, swaggerUi.setup(swagger, option))

//Run Project when database is connected successfully
connectedDatabase().then(conn => {
    app.listen(PORT, () => {
        console.log(`Server live on port ${PORT}`);
    })
});