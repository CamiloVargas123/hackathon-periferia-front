import axios from "axios";

const BASE_PATH = 'http://127.0.0.1:3000';

axios.defaults.baseURL = BASE_PATH;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';