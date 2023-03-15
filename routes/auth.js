const { Router } = require('express');
const router = Router();
const User = require('../models/userschema');
const Transactions = require('../models/transactionschema');
const bcrypt = require('bcrypt')

//Register a new user
router.post('/', async (req, res) => {
    const unique_num = parseInt(Math.random().toPrecision(6).slice(2))
    //Registeration payloads
    const {email, name, password, phonenumber} = req.body

    //Encrypt Users password with "bcrypt hash" 
    const encrptedPassword = await bcrypt.hash(password, 10)

    try {

        const newTransaction = new Transactions({
            inflow: 'Welcome Bonus of $5000',
            user_id: 'await _id'
        })

        const newUser = new User({
            name: name,
            email: email,
            password: encrptedPassword,
            phonenumber: phonenumber,
            payment_id : [unique_num],
            transaction_history : newTransaction
        })
        await newUser.save()
        await newTransaction.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})

router.post('/login', async (req, res) => {
    res.status(200).json({data: `Auth List`, message: `Succeful Request`})
})

router.post('/logout', async (req, res) => {
    res.status(200).json({data: `Auth List`, message: `Succeful Request`})
})

module.exports = router