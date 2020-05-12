import fs from 'fs';
import Path from 'path';
import axios from 'axios';


  (() => {
    const randomWidth = Math.floor(Math.random() * (500-300 + 1 ) + 300);
    const randomHeight = Math.floor(Math.random() * (500-300 + 1 ) + 300);
    const url = `http://placekitten.com/g/${randomWidth}/${randomHeight}`;
    const storageDir = '../storage';
    const saveDirectory = `${storageDir}/images`;
    const jsonSaveDirectory = `${storageDir}/data`;
  
    if (!fs.existsSync(Path.resolve(__dirname, storageDir))){
      fs.mkdirSync(Path.resolve(__dirname, storageDir));
      fs.mkdirSync(Path.resolve(__dirname, saveDirectory));
      fs.mkdirSync(Path.resolve(__dirname, jsonSaveDirectory));

    }


    async function downloadImage () {  

      const currentTime = Date.now();
      const fileName = `${currentTime}-kitten.jpg`;

      const path = Path.resolve(__dirname, saveDirectory, fileName);
      const writer = fs.createWriteStream(path);
    
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve({ name: fileName, time: currentTime, dir: saveDirectory }));
        writer.on('error', reject);
      });
    }
  
    downloadImage()
      .then(data => {
        const fileName = `${data.time}-kitten.json`;
        const jsonFilePath = Path.resolve(__dirname, jsonSaveDirectory, fileName);
        fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
          err ? console.error(err): console.log(`File saved to ${jsonFilePath}`);
        });
      })
      .catch(e => console.log(e, 'error'));
  })();
