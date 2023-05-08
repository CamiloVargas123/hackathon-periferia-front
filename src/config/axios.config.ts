import axios from "axios";

const BASE_PATH = 'https://hackathon-periferia.onrender.com';

axios.defaults.baseURL = BASE_PATH;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';