const Order = require('../models/Order')
const User = require('../models/User')

module.exports = async (req, res) => {
    const orders = await Order.find({"userid": req.session.userId})
    const user = await User.findById(req.session.userId)
    console.log(orders)
    console.log(req.session)
    res.render('profile', {
        orders,
        user
    });
}