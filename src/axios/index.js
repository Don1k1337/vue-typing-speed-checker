import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_HOST_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

    },
});

export default instance;