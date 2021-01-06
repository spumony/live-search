import axios from 'axios';

export const searchRequest = () => axios.get('https://localhost:8080/search');
