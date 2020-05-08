import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors())

dotenv.config();

console.log(process.env.PORT);

const port = process.env.PORT || 5000;

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
