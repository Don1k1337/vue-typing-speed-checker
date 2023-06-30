import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CORS_PROXY + import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': import.meta.env.VITE_CORS_URL
    },
});

export default instance;