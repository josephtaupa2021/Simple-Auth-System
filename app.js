const express = require('express')
const cookieParser = require("cookie-parser")
const { v4: uuidv4 } = require('uuid');
const fake_db = require('./db.js')
const matchCredentials = require('./utils.js')

const app = express()

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/', function (req, res) {
    res.render('pages/home')
})
app.get('/loginPage', function (req, res) {
    res.render('pages/login')
})

// create account
app.post('/create', function (req, res) {
    let body = req.body
    let id = uuidv4()
    let user = {
        username: body.username,
        password: body.password
    }
    fake_db.users[user.username] = user
    fake_db.sessions[id] = {
        user: user,
        timeOfLogin: Date.now()
    }
    res.cookie('SID', id, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    })
    res.redirect('/')
})

// login
app.post('/login', function (req, res) {
    if (matchCredentials(req.body)) {
        res.render('pages/members')
    }
    else {
        res.redirect('/error')
    }
})

// logout
app.post('/logout', function (req, res) {
    let logout = res.cookie = "username=SID; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (logout) {
        res.redirect('/logout')
    }
})


app.get('/logout', function (req, res) {
    res.render('pages/logout')
})
app.get('/error', function (req, res) {
    res.render('pages/error')
})
app.all('*', function (req, res) {
    res.render('pages/error')
})

app.listen(1612, console.log('Listening at port 1612'))