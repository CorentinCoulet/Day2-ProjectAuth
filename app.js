const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cryptoJS = require('crypto-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const user = {
    login: 'Alan',
    passwordHash: '73a056240baf641c8dc2c9bab20e0c2b457bd6e4' // Le hash de '4l4n'
};

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;
    if (login === user.login && cryptoJS.SHA1(password).toString() === user.passwordHash) {
        req.session.user = login;
        res.redirect('/secure');
    } else {
        res.redirect('/');
    }
});

app.get('/secure', isAuthenticated, (req, res) => {
    res.render('secure');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.redirect('/secure');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur l'adresse : http://localhost:${PORT}`);
});
