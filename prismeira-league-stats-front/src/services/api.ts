import axios from 'axios'

const api = axios.create({
    baseURL: 'https://prismeira.standarx.com'
});

export default api