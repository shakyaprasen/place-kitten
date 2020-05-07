const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/home', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED' });
});

app.get('/test', (req, res) => {
  res.json({
    data: {
      message: 'success'
    }
  });
});
