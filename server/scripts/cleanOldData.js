import fs from 'fs';
import path from 'path';

const directory = path.resolve(__dirname, `../storage/data`);

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.resolve(directory, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      const obj = JSON.parse(data);
      const imagePath = path.resolve(__dirname, obj.dir, obj.name);
      fs.unlink(imagePath, (err) => {
        if (err) throw err;
        console.log('image deleted', imagePath);
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          console.log('json deleted', filePath);
        })
      })
    });
  })

});