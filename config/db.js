const mongoose = require('mongoose');
const url = process.env.DATABASETESTURL;
const urlServer = process.env.DATABASEURL
let databaseName = process.env.DATABASENAME


const connected = mongoose.connect(`${urlServer}/${databaseName}`);
module.exports = connected
