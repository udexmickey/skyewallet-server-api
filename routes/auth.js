const { Router } = require('express');
const router = Router();
const User = require('../models/userschema');
const Transactions = require('../models/transactionschema');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

//Secure random TOKEN SECRET TOKEN
// const tokenKey = require('crypto').randomBytes(64).toString('hex')

const createToken = (id) => {
    return    jwt.sign({id}, process.env.TOKENSECRETTOKEN, {expiresIn: 60})
}
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
        const token = createToken(newUser._id)
        res.status(201).json({newUser, token})
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})

router.post('/login', async (req, res) => {
    try {
        // fetch user and test password verification
        const userEmail = await User.findOne({ email: req.body.email })
        if(userEmail){
            //Check a matching password
            const isMatchPassword = await bcrypt.compare(req.body.password, userEmail.password);
            !isMatchPassword && res.status(404).json(`incorrect Password`);
            const user = await User.findOne({ email: req.body.email }).select('-password');
            const token = createToken(userEmail._id)
            isMatchPassword && res.status(200).json({token, user});
        }else{
            res.status(404).json(`Valid Email is required on Login`);
        }
    } catch (error) {
        res.status(500).json(`${error}`)
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.headers.authorization = ''
        res.status(204).json({message: `Log out successful`});
    } catch (error) {
        res.status(500).json(`${error}`)
    }
})

module.exports = router