const mongoose = require('mongoose')
const Order = require('./models/Order')

mongoose.connect('mongodb://localhost/TeaFlexCafe',{useNewUrlParser:true})

Order.create({
    items: [
        { title: "Tropical Kiss", price: "35", quantity: "2"},
        { title: "Calm Your Mind", price: "20", quantity: "1" },
    ],
    total: "90",
}, (error, order) => {
    console.log(error, order)
})