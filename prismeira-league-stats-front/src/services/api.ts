import axios from 'axios'

const api = axios.create({
    baseURL: 'https://prismeira.standarx.com'
    // baseURL: 'http://localhost:3002'
});

export default api