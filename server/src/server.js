import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import Path from 'path';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use('/images',express.static('storage/images'));

dotenv.config();

const port = process.env.PORT || 8080;

app.get('/api/images', (req, res) => {

  const storageDir = Path.resolve(__dirname, '../storage/images');

  fs.readdir(storageDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(400);
    } else {
      res.json({
        data: {
          files: files
        }
      });
    }
  });

});

// create a GET route
app.get('*', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED' });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
