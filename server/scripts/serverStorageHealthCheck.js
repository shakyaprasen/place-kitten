import fs from 'fs';
import Path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
// import sgMail from '@sendgrid/mail';
dotenv.config();


(() => {
  const directory = Path.resolve(__dirname, `../storage/images`);
  const hrsAllowed = 5;
  const msToHr = 60*60*1000;
  const timeAllowedInMs = hrsAllowed * msToHr;
  
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    const olderFiles = [];
  
    files.forEach((file) => {
      const imagePath = `${directory}/${file}`;
      const statsObj = fs.statSync(imagePath);
      const timeElaspedSinceCreation = Date.now() - statsObj.birthtimeMs;
      if (timeElaspedSinceCreation >= timeAllowedInMs) {
        olderFiles.push(file);
      }
    });
    if (olderFiles.length) {
      const response = axios.post(process.env.WEBHOOK_SITE, { files: olderFiles });
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      // const msg = {
      //   to: 'kajiprasen@gmail.com',
      //   from: 'punit@reduct.video',
      //   subject: 'HealthCheck notification for server storage',
      //   html: `<strong>Following files were created before ${hrsAllowed}hrs but not deleted</strong>
      //   <ol>
      //     ${olderFiles.map(file => `<li>${file}<li>`)}
      //   <ol>
      //   `,
      // };

      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log('success');
      //   }, error => {
      //     console.error(error);
      //     if (error.response) {
      //       console.error(error.response.body)
      //     }
      //   });
    }
  });

})();

