const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./build'));

app.listen(PORT, function () {
  console.log(`Open http://localhost:${PORT}!`);
}); 