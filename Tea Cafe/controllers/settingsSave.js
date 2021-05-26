const User = require('../models/User')
const path = require('path')

module.exports = (req, res) => {
    let image = req.files.profilePic

    image.mv(path.resolve(__dirname, '..', 'public/img/profilePictures', image.name), async (error) => {
        await User.updateMany(
            { '_id': req.session.userId },
            [
                { $set: {'username': req.body.username} },
                { $set: {'profilePic': '/img/profilePictures/' + image.name} }
            ]
        )
        res.redirect('/profile/settings')

        })
}