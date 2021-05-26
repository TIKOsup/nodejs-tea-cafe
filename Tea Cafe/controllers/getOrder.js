const Order = require('../models/Order')

module.exports = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('userid')
    console.log(order)
    res.render('order',{
        order
    });
}