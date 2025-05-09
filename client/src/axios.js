import axios from 'axios';
const API = axios.create({
  baseURL: 'https://your-deployment-url.com/api', // 🔁 Replace with your backend URL
});

export default API;
