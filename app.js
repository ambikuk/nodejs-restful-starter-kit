const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonwebtoken = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

const route = require('./config/Route');

const port = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
    next();
});

route(app);

app.listen(port);
