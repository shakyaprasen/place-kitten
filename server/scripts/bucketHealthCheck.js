import { Storage } from '@google-cloud/storage';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const storage = new Storage();
  const bucketName = 'gs://place-kitten-bucket/';
  const [files] = await storage.bucket(bucketName).getFiles();

  const hrsAllowed = 24;
  const msToHr = 60*60*1000;
  const timeAllowedInMs = hrsAllowed * msToHr;

  const olderFiles = [];
  const apiCalls = files.map((file) => {
    return storage.bucket(bucketName).file(`${file.name}`).getMetadata();
  });
  Promise.all(apiCalls)
    .then((responses) => {
      responses.forEach(([metadata]) => {
        const createdTime = Date.parse(metadata.timeCreated);
        const timeElaspedSinceCreation = Date.now() - createdTime;
          if (timeElaspedSinceCreation >= timeAllowedInMs) {
            olderFiles.push(metadata.name);
          }
        });
        if (olderFiles.length) {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          
          const msg = {
            to: 'kajiprasen@gmail.com',
            from: 'punit@reduct.video',
            subject: 'HealthCheck notification for google-bucket',
            html: `<strong>Following files were created in the google-bucket ${bucketName} before ${hrsAllowed}hrs but not deleted</strong>
            <ol>
              ${olderFiles.map(file => `<li>${file}<li>`)}
            <ol>
            `,
          };
    
          sgMail
            .send(msg)
            .then(() => {
              console.log('success');
            }, error => {
              console.error(error);
              if (error.response) {
                console.error(error.response.body)
              }
            });
        }
    });

})();

