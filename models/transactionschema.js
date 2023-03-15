const mongoose = require('mongoose');
let Transactions

const transactionSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now,
        required: true,
    },
    inflow: { 
        type: String, 
        unique: false
    },
    outflow: { 
        type: String, 
        unique: false
    },
    amount: {
        type: Number,
        required: true,
        default: 5000
    },
    user_id: {
        type: String,
        ref: 'userschema._id',
        required: true
    }
})

Transactions = mongoose.model('transaction', transactionSchema)

module.exports = Transactions;
