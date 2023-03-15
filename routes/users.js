const { Router } = require('express');
const User = require('../models/userschema');
const Transactions = require('../models/transactionschema');
const router = Router();

//Get All Users
router.get('/', async (req, res) => {
    try {
        // This returns all the registered users but excludes their password
        User.find().select('-password').then(data => {
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})

//Get a single user
router.get('/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const user =  await User.find({_id: userID}).select('-password');

        if(user <= 1){
            res.status(400).json({message: `User not found`})
        }else{
            res.status(200).json({data: user, message: `Successful Request`})
        }
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})

//Update a user based on the your provided payload
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const {email, ...rest} = req.body
        const userID =  await User.find({_id: id}).select('-password');
        if(userID <= 1){
            res.status(400).json({message: `User with the id ${id} don't exist in database`})
        }else{
            const user = await User.updateOne({_id: id}, rest)
            res.status(200).json({user, message: `User updated successfully`})
        }
    } catch (error) {
        res.status(500).json(`${error}`)
    }
})

//Delete a user
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const userID =  await User.find({_id: id}).select('-password');
        if(userID <= 1){
            res.status(400).json({message: `User with the id ${id} don't exist in database`})
        }else{
            const user = await User.deleteOne({_id: id})
            res.status(200).json({message: `User deleted successfully`})
        }
    } catch (error) {
        res.status(500).json(`${error}`)
    }
})

module.exports = router