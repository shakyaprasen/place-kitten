const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())

const port = 80;

app.get('/test', (req, res) => {
  res.json({
    data: {
      message: 'success'
    }
  });
});

// create a GET route
app.get('*', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED' });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
