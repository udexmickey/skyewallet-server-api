const mongoose = require('mongoose');
const url = process.env.DATABASELOCALURL;
const urlServer = process.env.DATABASEURL
let databaseName = process.env.DATABASENAME


mongoose.set('strictQuery', false) 

const connect = async () => {
    try {
        const connected = await mongoose.connect(`${url}/${databaseName}`);
        console.log(`MongoDb connected : ${connected.connection.host}`);
    } catch (error) {
        console.log(`MongoDb not connected : ${error}`);
        process.exit(1)
    }
}

module.exports = connect
