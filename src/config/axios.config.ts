import axios from "axios";

const BASE_PATH = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = BASE_PATH;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000