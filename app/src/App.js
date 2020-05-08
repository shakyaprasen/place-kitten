import axios from 'axios';

//url fixed for now
axios.get("http://localhost:8080/api/images")
  .then(({ data }) => {
    const files = data.data.files;
    let imageHtml = '';
    const imageDiv = document.getElementById('root-image');

    files.forEach((file) => {
      imageHtml+= `<img class="image-file" src="http://localhost:8080/images/${file}"></img>`;
    });
    imageDiv.innerHTML = imageHtml;
  });

