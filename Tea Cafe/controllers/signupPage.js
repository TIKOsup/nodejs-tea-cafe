module.exports = (req, res) => {
    let email = ""
    let username = ""
    let password = ""
    const data = req.flash('data')[0]

    if (typeof data != "undefined") {
        email = data.email
        username = data.username
        password = data.password
    }

    res.render('signup', {
        errors: req.flash('validationErrors'),
        email: email,
        username: username,
        password: password
    })
}