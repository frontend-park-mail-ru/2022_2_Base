'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const publicFolder = path.resolve(__dirname, '..', 'dist');

app.use(morgan('dev'));
app.use(express.static(publicFolder));

const port = process.env.PORT || 3000;

//
// app.get('/sw.js', (req, res) => {
//     res.sendFile(path.resolve(`${publicFolder}/sw.js`));
// });

app.all('*', (req, res) => {
    res.sendFile(path.resolve(`${publicFolder}/index.html`));
});

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
