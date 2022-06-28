const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');
const auth = require('./middlewares/auth');

const userRouter = require('./components/user');
const btcRateRouter = require('./components/btcRate');

app.use(cookieParser());
app.use(verifyToken);

app.use('/user', userRouter);
app.use(auth);
app.use('/btc-rate', btcRateRouter);

const host = 'localhost';
const port = 5000;

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});


