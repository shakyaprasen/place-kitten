import fs from 'fs';
import path from 'path';

(() => {
  const directory = path.resolve(__dirname, `../storage/data`);
  
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    files.forEach((file) => {
      const filePath = path.resolve(directory, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) console.log(err);
        const obj = JSON.parse(data);
        if (obj.time >= Date.now() - (5 * 60 * 60 * 1000)) { //delete files older than 5 hrs
          return;
        }
        const imagePath = path.resolve(__dirname, obj.dir, obj.name);
        fs.unlink(imagePath, (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('image deleted', imagePath);
        })
      });
    })
  
  });
})();
