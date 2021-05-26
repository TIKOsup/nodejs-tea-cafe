const mongoose = require('mongoose')
const Schema = mongoose.Schema
let uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Enter the email address'],
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Enter the username'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Enter the password']
    },
    profilePic: {
        type: String,
        default: '/img/profilePictures/defaultProfilePic.png'
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('user', UserSchema)
module.exports = User