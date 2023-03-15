const mongoose = require('mongoose');
var arrayValidator = require('mongoose-array-validator');
let User

const validateEmail = function(email) {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,1}$/
  return regex.test(email)
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    email:  {
        unique: true,
        type: String,
        required: [true, "Please enter your email"],
        validate: [validateEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    payment_id: {
       type: [Number], unique: true, required: true,
        minItems: {
            value: 0,
            message: props => `length of \`${props.path}\` (${props.value.length}) is less than allowed!`
        },
        maxItems: {
            value: 5,
            message: props => `length of \`${props.path}\` (${props.value.length}) is more than allowed!`
        },
        uniqueItems: {
            value: true,
            message: props => `No duplicates allowed!`
        },
        unique: true,
    },
    transaction_history: {
        type: [],
        ref: 'transactionSchema',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 5000
    },
})

userSchema.plugin(arrayValidator);

User = mongoose.model('users', userSchema)

module.exports = User;
