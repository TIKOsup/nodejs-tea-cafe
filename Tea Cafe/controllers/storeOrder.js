const Order = require('../models/Order')

module.exports = (req, res) => {
    Order.create({
        items: req.body.items,
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.total,
        userid: req.session.userId
    }).then(order => {
        res.redirect("/")
    })
}