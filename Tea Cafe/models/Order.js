const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    items: [
        {
        title: {type: String},
        price: {type: String},
        quantity: {type: String}
        }
        ],
    total: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    datePurchased:{
        type: Date,
        default: new Date()
    }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order