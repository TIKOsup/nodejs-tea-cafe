module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('/', {
            createOrder: true
        })
    }

    res.redirect('/auth/signin')
}