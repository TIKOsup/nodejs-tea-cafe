const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const mainPageController = require('./controllers/mainPage')
const signinPageController = require('./controllers/signinPage')
const signupPageController = require('./controllers/signupPage')
const profilePageController = require('./controllers/profilePage')
const settingsPageController = require('./controllers/settingsPage')

const storeUserController = require('./controllers/storeUser')
const signinUserController = require('./controllers/signinUser')
const signoutController = require('./controllers/signout')

const newOrderController = require('./controllers/newOrder')
const storeOrderController = require('./controllers/storeOrder')
const getOrderController = require('./controllers/getOrder')

const settingsSaveController = require('./controllers/settingsSave')

//const orderValidationMiddleware = require('./middleware/orderValidationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redicertIfAuthenticatedMiddleware')

const expressSession = require('express-session')
const flash = require('connect-flash')

app.use(fileUpload())

mongoose.connect('mongodb://localhost/TeaFlexCafe', {useNewUrlParser: true})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(6868,() => {
	console.log('Cafe opened at 6868 avenue :)')
})

//app.use('/profile/orders/store', orderValidationMiddleware)

app.use(expressSession({
	secret: 'tiko catte'
}))

global.loggedIn = null

app.use('*', (req, res, next) => {
	loggedIn = req.session.userId
	next()
})

app.use(flash())

app.get('/', mainPageController)
app.get('/auth/signin', redirectIfAuthenticatedMiddleware, signinPageController)
app.get('/auth/signup', redirectIfAuthenticatedMiddleware, signupPageController)
app.get('/profile', authMiddleware, profilePageController)
app.get('/profile/settings', authMiddleware, settingsPageController)

app.post('/profile/settings/save', authMiddleware, settingsSaveController)

app.get('/profile/orders/new', newOrderController, authMiddleware)
app.get('/profile/order/:id', getOrderController)
app.post('/profile/orders/store', authMiddleware, storeOrderController)

app.post('/users/signup', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/signin', redirectIfAuthenticatedMiddleware, signinUserController)
app.get('/auth/signout', signoutController)
app.use((req, res) => res.render('notfound'))