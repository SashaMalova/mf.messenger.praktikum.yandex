const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static('./build', {extensions: ['js', 'ts']}));

app.get('*.map', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, 'build', req.url.slice(1)))
});

app.get('*.ts', (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, req.url.slice(1)))
});

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(PORT, function () {
    console.log(`Open http://localhost:${PORT}!`);
});
