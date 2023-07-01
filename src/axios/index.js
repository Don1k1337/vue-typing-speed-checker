import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.forismatic.com/api/1.0/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': import.meta.env.VITE_HOST_URL
    },
});

export default instance;