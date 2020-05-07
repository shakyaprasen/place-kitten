import axios from 'axios';

//url fixed for now
axios.get("http://localhost:5000/test")
  .then(({ data }) => console.log(data.data.message));

