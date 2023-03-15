const { Router } = require('express');
const User = require('../models/userschema');
const Transactions = require('../models/transactionschema');
const protectedRoute = require('../middleware/ProtectedRoute');
const router = Router();

//Inflow transaction Add receipt to a transaction history belonging to a user
router.patch('/:id',  protectedRoute, async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.find({payment_id: id}).select('-password');
        const {amount, inflow, outflow} = req.body
    
        const newReceipt = new Transactions({ 
            inflow: inflow,
            amount: parseInt(amount)
        })
        
        if(user.length == 1){
            await newReceipt.save()
    
            const invoice = await User.updateOne({payment_id: id}, {
                $inc: {balance: parseInt(amount)}, 
                $push: {transaction_history: newReceipt}
            });
            res.status(200).json(invoice)
        }else{
            res.status(404).json({message: `User not found`})
        }
         
    } catch (error) {
        res.status(500).json({message: `${error}`}) 
    } 
})


//Outflow transaction Remove receipt to a transaction history belonging to a user
router.delete('/:id',  protectedRoute, async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.find({payment_id: id}).select('-password');
        const {amount, outflow} = req.body
    
        const newReceipt = new Transactions({ 
            outflow: outflow,
            amount: parseInt(amount)
        })
        
        if(user.length == 1){
            await newReceipt.save()
    
            const invoice = await User.updateOne({payment_id: id}, {
                $inc: {balance: -parseInt(amount)}, 
                $pull: {transaction_history: newReceipt}
            });
            res.status(200).json(invoice)
        }else{
            res.status(404).json({message: `User not found`})
        }
         
    } catch (error) {
        res.status(500).json({message: `${error}`}) 
    } 
})

//Search/Query for a user using their payment id 
router.get('/Search',  protectedRoute, async (req, res) => {
  let search = req.query.payments;
    try {
        // Create expression
        var re = new RegExp(search, "i");
        let find = {};
        if (search != undefined && search != "") {
                find = { $or: [{ payment_id:  search }]};
                let dataSearched = await User.find(find).select('-password');

                if(dataSearched <= 1){
                    res.status(400).json({message: `This Payment Id ${search} doesn't belong to a user`})
                }else{
                    res.status(200).json(dataSearched)
                }
        }else{
            res.status(404).json({message: `Pass in the payment ID you want to search for as a query`}) 
        }
    } catch (error) {
        res.status(500).json({message: `${error}`}) 
    }
});

router.get('/:id',  protectedRoute, async (req, res) => {
    const id = req.params.id
    const receipt = await Transactions.find({_id: id})
    res.status(200).json(receipt)
})

//Generate new payment id
router.patch('/:id/payment-id',  protectedRoute, async (req, res) => {
    const unique_number2 = parseInt(Math.random().toPrecision(6).slice(2)) 
    const id = req.params.id
    try {
        const findUser = await User.find({_id: id}).select('-password');
        if(findUser.length == 1){
            findUser.map(async data => {
                if(data.payment_id.length <= 4){
                    const user =  await User.updateOne({_id: data._id}, {$push: {payment_id: unique_number2}}).select('-password');
                    res.status(200).json({message: `payments_id ${unique_number2} have been added successfully`})
                }else{
                    res.status(400).json({message : 'You have reach your highest number of payment id'})
                }
            })
        }else{
            res.status(404).json({message: `User not found`})
        }
    } catch (error) {
        res.status(500).json(`${error}`)
    }

})

//Delete a payment id
router.delete('/:id/payment-id',  protectedRoute, async (req, res) => { 
    try {
            const userID = req.params.id
            let {payment_num} = req.body;
            const user =  await User.find({payment_id: payment_num}).select('-password');
            if(user.length == 1){
                await User.updateOne({_id: userID}, {$pull: {payment_id: payment_num}}).select('-password');
                res.status(200).json({message: `payments_id ${payment_num} was deleted successfully`})
            }else{
                res.status(400).json({message: `payments_id was not found`})
            }
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})

module.exports = router