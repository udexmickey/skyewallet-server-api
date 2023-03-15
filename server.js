const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
let multer = require('multer');
let forms = multer();
const app = express();
const cookieParser = require('cookie-parser')
const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const transactionsRoute = require('./routes/transactions');
const connectedDatabase = require('./config/db')

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
            url: 'http://localhost:3000'
        }]
    },

    apis: ["./routes/*.js"]
}

var option = {
    customCssUrl: '/custom.css'
};

const swagger = swaggerDoc(options)


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger, option))


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running successfully");
})