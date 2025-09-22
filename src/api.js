import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || ''; // empty => CRA dev proxy or same origin
const api = axios.create({ baseURL, timeout: 10000 });
export default api;
