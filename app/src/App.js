import axios from 'axios';

const BASE_URL = '35.186.144.89:8080';
//url fixed for now
axios.get(`${BASE_URL}/api/images`)
  .then(({ data }) => {
    const files = data.data.files;
    let imageHtml = '';
    const imageDiv = document.getElementById('root-image');

    files.forEach((file) => {
      imageHtml+= `<img class="image-file" src="${BASE_URL}/images/${file}"></img>`;
    });
    imageDiv.innerHTML = imageHtml;
  });

