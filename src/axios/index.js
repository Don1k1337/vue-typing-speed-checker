import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
});

export default instance;