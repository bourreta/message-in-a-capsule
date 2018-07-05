const express = require('express');
const router = express.Router();

// Message Model
const Message = require('../../models/Message');

// @route GET api/messages
// @desc Get a random Message
// @access Public
router.get('/', (req, res) => { 
        Message.count()
        .exec((err, count) => {
            const random = Math.floor(Math.random() * count);
            Message.findOne()
            .skip(random)
            .exec((err, result) => {
                    res.json(result);
                if(err){
                    console.log(err);
                }
            });
        });
});

router.post('/', (req, res) => {

    const newMessage = new Message({
        name: req.body.name,
        message: req.body.message
    });
    newMessage.save()
    .then(msg => res.json(msg))
    .catch(err => console.log(err));
});

router.post('/:id', (req, res) => {
    Message.
    findById(req.params.id)
    .then(msg => {
        msg.score += req.body.scoreChange; 
        msg.save()
        .then(msg => res.json({success: true}))
        .catch(err => {console.log(err); 
            res.status(400).json({success: false})})
    .catch(err => {console.log(err); res.status(404).json({success: false})});
    });
});


/*
router.delete('/:id', (req, res) => {
    Message.findById(req.params.id)
    .then(msg => msg.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json(({success: false})));
})*/

module.exports = router;