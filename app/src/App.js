import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

//url fixed for now
axios.get(`${process.env.BASE_URL}/api/images`)
  .then(({ data }) => {
    const files = data.data.files;
    let imageHtml = '';
    const imageDiv = document.getElementById('root-image');

    files.forEach((file) => {
      imageHtml+= `<img class="image-file" src="${process.env.BASE_URL}/images/${file}"></img>`;
    });
    imageDiv.innerHTML = imageHtml;
  });

